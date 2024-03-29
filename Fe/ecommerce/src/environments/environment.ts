// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://dev.smartpro.com.ar/app_dev.php/api/',
  imgUrl:{
    xs:'http://dev.smartpro.com.ar/uploads/xs/',
    sm:'http://dev.smartpro.com.ar/uploads/sm/',
    md:'http://dev.smartpro.com.ar/uploads/md/',
    lg:'http://dev.smartpro.com.ar/uploads/lg/',
    xl:'http://dev.smartpro.com.ar/uploads/xl/',
    or:'http://dev.smartpro.com.ar/uploads/or/'
  }
  // apiUrl: 'http://smartpro.api.mdasoftware.com.ar/web/api/',
  // imgUrl:{
  //   xs:'http://smartpro.api.mdasoftware.com.ar/web/uploads/xs/',
  //   sm:'http://smartpro.api.mdasoftware.com.ar/web/uploads/sm/',
  //   md:'http://smartpro.api.mdasoftware.com.ar/web/uploads/md/',
  //   lg:'http://smartpro.api.mdasoftware.com.ar/web/uploads/lg/',
  //   xl:'http://smartpro.api.mdasoftware.com.ar/web/uploads/xl/',
  //   or:'http://smartpro.api.mdasoftware.com.ar/web/uploads/or/'
  // }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
