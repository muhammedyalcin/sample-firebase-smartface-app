import Page1Design from 'generated/pages/page1';
import componentContextPatch from '@smartface/contx/lib/smartface/componentContextPatch';
import PageTitleLayout from 'components/PageTitleLayout';
import System from '@smartface/native/device/system';
import Notifications from "@smartface/native/global/notifications"

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
