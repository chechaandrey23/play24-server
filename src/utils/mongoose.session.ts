import {Model, Connection, ClientSession} from 'mongoose';
import {Injectable} from '@nestjs/common';

@Injectable()
class MongooseSession {
	public async withSession<T>(session: ClientSession|undefined|null, fn: (s: ClientSession) => Promise<T>): Promise<T> {
		const currentSession: ClientSession = session?session:await (this as any).connection.startSession();

		let res: T;

		if(!session) {
			try {
				currentSession.startTransaction();
				res = await fn.call(null, currentSession);
				await currentSession.commitTransaction();
			} catch(e) {
				await currentSession.abortTransaction();
				throw e;
			} finally {
				currentSession.endSession();
			}
		} else {
			res = await fn.call(null, session);
		}

		return res;
	}
}

type TypeMethodWithSession = <T>(s: ClientSession|undefined|null, fn: (s: ClientSession) => Promise<T>) => Promise<T>;

export {MongooseSession, TypeMethodWithSession};
