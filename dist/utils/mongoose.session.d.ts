import { ClientSession } from 'mongoose';
declare class MongooseSession {
    withSession<T>(session: ClientSession | undefined | null, fn: (s: ClientSession) => Promise<T>): Promise<T>;
}
type TypeMethodWithSession = <T>(s: ClientSession | undefined | null, fn: (s: ClientSession) => Promise<T>) => Promise<T>;
export { MongooseSession, TypeMethodWithSession };
