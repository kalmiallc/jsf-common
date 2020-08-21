/**
 * Basic interface for dispatching notifications to the application.
 */
export interface JsfNotificationInterface {
  level: 'info' | 'success' | 'warn' | 'error';
  message: string;

  /**
   * @deprecated Only use the message parameter.
   */
  title?: string;
}
