declare module "nodemailer" {
  export interface Transporter {
    verify(): Promise<boolean>;
    sendMail(options: Record<string, unknown>): Promise<unknown>;
  }

  export function createTransport(options: Record<string, unknown>): Transporter;

  const nodemailer: {
    createTransport: typeof createTransport;
  };

  export default nodemailer;
}
