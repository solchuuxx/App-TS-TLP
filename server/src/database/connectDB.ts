import mongoose, {connect} from 'mongoose';

//>>>>>
mongoose.set('strictQuery', true);

const connectDB = async () => {
  try {
    await connect('mongodb://localhost:27017/formotexdb');
    console.log('MongoDB conectado');
  } catch (error) {
    console.error('Error al conectar a MongoDB', error);
    process.exit(1);
  }
};

export default connectDB;

