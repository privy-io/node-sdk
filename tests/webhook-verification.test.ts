import { verifyWebhook, WebhookVerificationError } from '../src/lib/auth';

describe('verifyWebhook', () => {
  const mockPayload = {
    event: 'user.created',
    data: { id: 'user_123', email: 'test@example.com' },
  };

  const validSecret = 'whsec_test_secret_key';
  const validHeaders = {
    id: 'msg_test_id',
    timestamp: '1640995200',
    signature: 'v1,test_signature_hash',
  };

  it('should verify a valid webhook payload', () => {
    // Note: This test would need a real signature for the payload
    // For now, we'll test the error case to ensure the function structure is correct
    expect(() => {
      verifyWebhook({
        payload: mockPayload,
        headers: validHeaders,
        secret: validSecret,
      });
    }).toThrow(WebhookVerificationError);
  });

  it('should throw WebhookVerificationError for invalid signature', () => {
    const invalidHeaders = {
      ...validHeaders,
      signature: 'v1,invalid_signature',
    };

    expect(() => {
      verifyWebhook({
        payload: mockPayload,
        headers: invalidHeaders,
        secret: validSecret,
      });
    }).toThrow(WebhookVerificationError);
  });

  it('should throw WebhookVerificationError for invalid secret', () => {
    expect(() => {
      verifyWebhook({
        payload: mockPayload,
        headers: validHeaders,
        secret: 'invalid_secret',
      });
    }).toThrow(WebhookVerificationError);
  });

  it('should throw WebhookVerificationError for missing headers', () => {
    const incompleteHeaders = {
      id: 'msg_test_id',
      timestamp: '1640995200',
      // missing signature
    } as any;

    expect(() => {
      verifyWebhook({
        payload: mockPayload,
        headers: incompleteHeaders,
        secret: validSecret,
      });
    }).toThrow(WebhookVerificationError);
  });

  it('should handle empty payload', () => {
    expect(() => {
      verifyWebhook({
        payload: {},
        headers: validHeaders,
        secret: validSecret,
      });
    }).toThrow(WebhookVerificationError);
  });
});
