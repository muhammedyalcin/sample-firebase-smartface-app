import Page1Design from 'generated/pages/page1';
import componentContextPatch from '@smartface/contx/lib/smartface/componentContextPatch';
import PageTitleLayout from 'components/PageTitleLayout';
import System from '@smartface/native/device/system';
import Notifications from "@smartface/native/global/notifications"
import FirebaseAnalytics from '@smartface/plugin-firebase/firebaseAnalytics';
import FirebaseCrashlytics from '@smartface/plugin-firebase/firebaseCrashlytics';

const NativeLog = requireClass("android.util.Log");

export default class Page1 extends Page1Design {
    router: any;
    constructor() {
        super(); 
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        this.btnNext.onPress = () => { 
   
            Notifications.registerForPushNotifications(
                ({ token }) => {
                    alert(token);
                    NativeLog.d("FCMTEST", token)
                }, 
                () => {
                    alert("error");
                    NativeLog.d("FCMTEST", "error")
                })
        };

        this.btnDelete.onPress = () => {
            Notifications.unregisterForPushNotifications();
        }
    }
}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 */
function onShow(superOnShow: () => void) {
    superOnShow();
    this.headerBar.titleLayout.applyLayout();
    /*
      You can use Crashlytics.setUserIdentifier to provide an ID number, token, or hashed value that uniquely     
      identifies the end-user of your application without disclosing or transmitting any of their personal 
      information. This value is displayed right in the FirebaseCrashlytics dashboard.
    */
    FirebaseCrashlytics.setUserIdentifier("UserIdentifier");
    
    // If you would like to take advantage of advanced user identifier features, you can additionally use both:
    FirebaseCrashlytics.ios.setUserName("UserName");
    FirebaseCrashlytics.ios.setUserEmail("UserEmail");
    
    /*
      Crashlytics allows you to associate arbitrary key/value pairs with your crash reports, which are viewable 
      right from the Crashlytics dashboard. Setting keys are as easy as calling: Crashlytics.setString(key, value) 
      or one of the related methods. Options are:
    */
    FirebaseCrashlytics.setString("keyString", "value");
    FirebaseCrashlytics.setBool("setBool", true);
    FirebaseCrashlytics.setFloat("setFloat", 15.5);
    FirebaseCrashlytics.setInt("setInt", 12);
}

/**
 * @event onLoad
 * This event is called once when page is created.
 */
function onLoad(superOnLoad: () => void) {
    superOnLoad();
    console.info('Onload page1');
    this.headerBar.leftItemEnabled = false;
    this.headerBar.titleLayout = new PageTitleLayout();
    componentContextPatch(this.headerBar.titleLayout, 'titleLayout');
    if (System.OS === 'Android') {
        this.headerBar.title = '';
    }

    Notifications.onNotificationReceive = (e) => {
         NativeLog.d("FCMTEST", "token" + JSON.stringify(e))
        return [];
    }
}
