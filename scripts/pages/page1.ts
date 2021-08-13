import Page1Design from 'generated/pages/page1';
import componentContextPatch from '@smartface/contx/lib/smartface/componentContextPatch';
import PageTitleLayout from 'components/PageTitleLayout';
import System from '@smartface/native/device/system';
import FirebaseCrashlytics from 'sf-plugin-firebase/firebaseCrashlytics';
import Firebase from 'sf-plugin-firebase';
import FirebaseAnalytics from 'sf-plugin-firebase/firebaseAnalytics';

export default class Page1 extends Page1Design {
    router: any;
    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        this.btnNext.onPress = () => {
            this.router.push('/pages/page2', { message: 'Hello World!' });
        };
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
      information. This value is displayed right in the Fabric dashboard.
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
    
    var attribute2 = new FirebaseAnalytics.CustomAttribute("test_attribute",12);
    Firebase.analytics.logEvent("open_app_test" , attribute2);
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
}
