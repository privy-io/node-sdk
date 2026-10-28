// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../core/resource';
import * as EnrollmentAPI from './enrollment';
import { Enrollment, EnrollmentInitParams, EnrollmentVerifyParams } from './enrollment';
import * as VerificationAPI from './verification';
import { Verification, VerificationInitParams, VerificationVerifyParams } from './verification';

export class Passkey extends APIResource {
  enrollment: EnrollmentAPI.Enrollment = new EnrollmentAPI.Enrollment(this._client);
  verification: VerificationAPI.Verification = new VerificationAPI.Verification(this._client);
}

Passkey.Enrollment = Enrollment;
Passkey.Verification = Verification;

export declare namespace Passkey {
  export {
    Enrollment as Enrollment,
    type EnrollmentInitParams as EnrollmentInitParams,
    type EnrollmentVerifyParams as EnrollmentVerifyParams,
  };

  export {
    Verification as Verification,
    type VerificationInitParams as VerificationInitParams,
    type VerificationVerifyParams as VerificationVerifyParams,
  };
}
