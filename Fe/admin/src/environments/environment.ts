// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // apiUrl: 'https://smartpro.com.ar/api/web/app_dev.php/api/',
  // imgUrl:{
  //   xs:'https://smartpro.com.ar/api/web/app_dev.php/uploads/xs/',
  //   sm:'https://smartpro.com.ar/api/web/app_dev.php/uploads/sm/',
  //   md:'https://smartpro.com.ar/api/web/app_dev.php/uploads/md/',
  //   lg:'https://smartpro.com.ar/api/web/app_dev.php/uploads/lg/',
  //   xl:'https://smartpro.com.ar/api/web/app_dev.php/uploads/xl/',
  //   or:'https://smartpro.com.ar/api/web/app_dev.php/uploads/or/'
  // }
  apiUrl: 'http://dev.smartpro.com.ar/app_dev.php/api/',
  imgUrl:{
    xs:'http://dev.smartpro.com.ar/uploads/xs/',
    sm:'http://dev.smartpro.com.ar/uploads/sm/',
    md:'http://dev.smartpro.com.ar/uploads/md/',
    lg:'http://dev.smartpro.com.ar/uploads/lg/',
    xl:'http://dev.smartpro.com.ar/uploads/xl/',
    or:'http://dev.smartpro.com.ar/uploads/or/'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
