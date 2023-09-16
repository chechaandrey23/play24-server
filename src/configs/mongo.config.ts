import {registerAs} from '@nestjs/config';

export default registerAs('mongo', () => ({
  //uri: 'mongodb://localhost:27017/play24',
  //uri: `mongodb://localhost:27017`,
  uri: process.env.MONGO_URI || `mongodb://127.0.0.1:27017/play24?directConnection=true&serverSelectionTimeoutMS=2000`
}));
