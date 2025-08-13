// إعداد Agora.io للدروس المسجلة والبث المباشر
import AgoraRTC, { 
  IAgoraRTCClient, 
  ICameraVideoTrack, 
  IMicrophoneAudioTrack,
  IRemoteVideoTrack,
  IRemoteAudioTrack
} from 'agora-rtc-sdk-ng';

// إعدادات Agora
const APP_ID = 'your_agora_app_id'; // يجب استبداله بـ App ID الحقيقي
const TOKEN = null; // للاختبار، في الإنتاج يجب استخدام token آمن

export interface AgoraConfig {
  appId: string;
  channel: string;
  token?: string;
  uid?: string | number;
}

export class AgoraService {
  private client: IAgoraRTCClient;
  private localVideoTrack?: ICameraVideoTrack;
  private localAudioTrack?: IMicrophoneAudioTrack;
  private remoteUsers: Map<string, { videoTrack?: IRemoteVideoTrack; audioTrack?: IRemoteAudioTrack }> = new Map();

  constructor() {
    this.client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
    this.setupEventHandlers();
  }

  private setupEventHandlers() {
    // عند انضمام مستخدم جديد
    this.client.on('user-published', async (user, mediaType) => {
      await this.client.subscribe(user, mediaType);
      
      if (mediaType === 'video') {
        const remoteVideoTrack = user.videoTrack;
        if (remoteVideoTrack) {
          this.remoteUsers.set(user.uid.toString(), {
            ...this.remoteUsers.get(user.uid.toString()),
            videoTrack: remoteVideoTrack
          });
        }
      }
      
      if (mediaType === 'audio') {
        const remoteAudioTrack = user.audioTrack;
        if (remoteAudioTrack) {
          remoteAudioTrack.play();
          this.remoteUsers.set(user.uid.toString(), {
            ...this.remoteUsers.get(user.uid.toString()),
            audioTrack: remoteAudioTrack
          });
        }
      }
    });

    // عند مغادرة مستخدم
    this.client.on('user-unpublished', (user, mediaType) => {
      if (mediaType === 'video') {
        const userData = this.remoteUsers.get(user.uid.toString());
        if (userData?.videoTrack) {
          userData.videoTrack.stop();
        }
      }
    });

    // عند مغادرة مستخدم نهائياً
    this.client.on('user-left', (user) => {
      this.remoteUsers.delete(user.uid.toString());
    });
  }

  // الانضمام لقناة
  async joinChannel(config: AgoraConfig): Promise<void> {
    try {
      await this.client.join(config.appId, config.channel, config.token || null, config.uid);
      console.log('تم الانضمام للقناة بنجاح');
    } catch (error) {
      console.error('خطأ في الانضمام للقناة:', error);
      throw error;
    }
  }

  // إنشاء وتشغيل الفيديو المحلي
  async createLocalVideoTrack(): Promise<void> {
    try {
      this.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
      console.log('تم إنشاء مسار الفيديو المحلي');
    } catch (error) {
      console.error('خطأ في إنشاء مسار الفيديو:', error);
      throw error;
    }
  }

  // إنشاء وتشغيل الصوت المحلي
  async createLocalAudioTrack(): Promise<void> {
    try {
      this.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      console.log('تم إنشاء مسار الصوت المحلي');
    } catch (error) {
      console.error('خطأ في إنشاء مسار الصوت:', error);
      throw error;
    }
  }

  // نشر المسارات المحلية
  async publishLocalTracks(): Promise<void> {
    try {
      const tracks = [];
      if (this.localVideoTrack) tracks.push(this.localVideoTrack);
      if (this.localAudioTrack) tracks.push(this.localAudioTrack);
      
      if (tracks.length > 0) {
        await this.client.publish(tracks);
        console.log('تم نشر المسارات المحلية');
      }
    } catch (error) {
      console.error('خطأ في نشر المسارات:', error);
      throw error;
    }
  }

  // تشغيل الفيديو المحلي في عنصر HTML
  playLocalVideo(elementId: string): void {
    if (this.localVideoTrack) {
      this.localVideoTrack.play(elementId);
    }
  }

  // تشغيل فيديو مستخدم بعيد
  playRemoteVideo(uid: string, elementId: string): void {
    const userData = this.remoteUsers.get(uid);
    if (userData?.videoTrack) {
      userData.videoTrack.play(elementId);
    }
  }

  // كتم/إلغاء كتم الميكروفون
  async toggleMicrophone(): Promise<boolean> {
    if (this.localAudioTrack) {
      const enabled = this.localAudioTrack.enabled;
      await this.localAudioTrack.setEnabled(!enabled);
      return !enabled;
    }
    return false;
  }

  // تشغيل/إيقاف الكاميرا
  async toggleCamera(): Promise<boolean> {
    if (this.localVideoTrack) {
      const enabled = this.localVideoTrack.enabled;
      await this.localVideoTrack.setEnabled(!enabled);
      return !enabled;
    }
    return false;
  }

  // مغادرة القناة
  async leaveChannel(): Promise<void> {
    try {
      // إيقاف المسارات المحلية
      if (this.localVideoTrack) {
        this.localVideoTrack.stop();
        this.localVideoTrack.close();
      }
      if (this.localAudioTrack) {
        this.localAudioTrack.stop();
        this.localAudioTrack.close();
      }

      // مغادرة القناة
      await this.client.leave();
      console.log('تم مغادرة القناة');
    } catch (error) {
      console.error('خطأ في مغادرة القناة:', error);
      throw error;
    }
  }

  // الحصول على قائمة المستخدمين المتصلين
  getRemoteUsers(): string[] {
    return Array.from(this.remoteUsers.keys());
  }

  // فحص حالة الاتصال
  getConnectionState(): string {
    return this.client.connectionState;
  }
}

// إنشاء instance مشترك
export const agoraService = new AgoraService();

// دالة مساعدة لإنشاء معرف فريد للقناة
export function generateChannelName(teacherId: string, studentId: string): string {
  return `lesson_${teacherId}_${studentId}_${Date.now()}`;
}

// دالة مساعدة للتحقق من دعم المتصفح
export function checkBrowserSupport(): boolean {
  return AgoraRTC.checkSystemRequirements();
}