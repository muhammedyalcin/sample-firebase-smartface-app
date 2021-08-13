/* globals lang */
import 'i18n/i18n'; // Generates global lang object
import Application from '@smartface/native/application';
import { errorStackBySourceMap } from 'error-by-sourcemap';
import System from '@smartface/native/device/system';
import '@smartface/extension-utils';
import 'theme';
import router from 'routes';

// Set uncaught exception handler, all exceptions that are not caught will
// trigger onUnhandledError callback.
Application.onUnhandledError = function (e: UnhandledError) {
    console.error(e); 
    const error = errorStackBySourceMap(e);
    alert({
        title: e.type || lang.applicationError,
        message:
            System.OS === 'Android' ? error.stack : e.message + '\n\n*' + error.stack,
    });
};
 
import Firebase from '@smartface/plugin-firebase';
import File = require('@smartface/native/io/file');
var iOSPlistFile = new File({
    path: 'assets://GoogleService-Info.plist'
});
var firebaseConfig = {
    iosFile : iOSPlistFile
};

import FirebaseCrashlytics from '@smartface/plugin-firebase/firebaseCrashlytics';

// if (Firebase.apps().length === 0) {
//   Firebase.initializeApp(firebaseConfig);
  FirebaseCrashlytics.ios.with([new FirebaseCrashlytics()]);
// }

router.push('/pages/page1');
