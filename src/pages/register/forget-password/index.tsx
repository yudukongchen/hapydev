import { theme } from 'antd';
import { RegisterWrapper } from '../style';
import { DEFAULT_DATA } from './constant';
import Header from '../header';
import { useSafeState } from 'ahooks';
import Step1 from './step1';
import StepEmail2 from './stepEmail2';
import StepPhone2 from './stepPhone2';

const Register = () => {
  const { token } = theme.useToken();

  const [data, setData] = useSafeState(DEFAULT_DATA);
  const [step, setStep] = useSafeState('step1');

  return (
    <RegisterWrapper token={token}>
      <Header />
      {step === 'step1' && <Step1 step={step} setStep={setStep} data={data} setData={setData} />}
      {step === 'stepEmail2' && <StepEmail2 step={step} setStep={setStep} />}
      {step === 'stepPhone2' && <StepPhone2 data={data} step={step} setStep={setStep} />}
    </RegisterWrapper>
  );
};
export default Register;
