// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../core/resource';
import * as EnrollmentAPI from './enrollment';
import { Enrollment, EnrollmentInitParams, EnrollmentVerifyParams } from './enrollment';
import * as VerificationAPI from './verification';
import { Verification, VerificationVerifyParams } from './verification';

export class Totp extends APIResource {
  enrollment: EnrollmentAPI.Enrollment = new EnrollmentAPI.Enrollment(this._client);
  verification: VerificationAPI.Verification = new VerificationAPI.Verification(this._client);
}

Totp.Enrollment = Enrollment;
Totp.Verification = Verification;

export declare namespace Totp {
  export {
    Enrollment as Enrollment,
    type EnrollmentInitParams as EnrollmentInitParams,
    type EnrollmentVerifyParams as EnrollmentVerifyParams,
  };

  export { Verification as Verification, type VerificationVerifyParams as VerificationVerifyParams };
}
