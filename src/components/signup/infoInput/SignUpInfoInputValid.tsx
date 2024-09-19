import { useEffect, useState } from 'react';
import Button from '../../common/button/Button';
import DateSelect from './signupdateselect/SignUpDateSelect';
import Header from '../../common/header/Header';
import Input from './signupinput/SignUpInput';
import Modal from '../../common/modal/Modal';
import Select from './signupselect/SignUpSelect';
import { hamburger_menu } from '../../../assets/assets';
import { fullContainer } from '../../login/login.css';
import { errorMessage, signupFormContainer, signupFormGap, submitbuttonContainer } from '../signup.css';
import { useNavigate } from 'react-router-dom';
import { auth, USER_COLLECTION } from '../../../firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';
import { responsiveBox } from '../../../styles/responsive.css';

const SignUpInfoInputValid = () => {
  type FormErrors = {
    userEmail?: string;
    userPassword?: string;
    userName?: string;
    gender?: string;
    birthDate?: string;
    [key: string]: string | undefined;
  };

  type FormData = {
    userEmail: string;
    userPassword: string;
    userName: string;
    gender: string;
    birthDate: {
      year: string;
      month: string;
      day: string;
    };
  };

  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<FormData>({
    userEmail: '',
    userPassword: '',
    userName: '',
    gender: '',
    birthDate: {
      year: '',
      month: '',
      day: '',
    },
  });

  const validate = (data: FormData): FormErrors => {
    const newErrors: FormErrors = {};
    if (!data.userEmail) {
      newErrors.userEmail = '이메일을 입력해주세요';
    } else if (!/\S+@\S+\.\S+/.test(data.userEmail)) {
      newErrors.userEmail = '유효한 형식의 이메일을 입력해주세요';
    }
    if (!data.userPassword) newErrors.userPassword = '비밀번호를 입력해주세요';
    if (!data.userName) newErrors.userName = '이름을 입력해주세요';
    if (!data.gender) newErrors.gender = '성별을 선택해주세요';
    const { year, month, day } = data.birthDate;
    if (!year || !month || !day) newErrors.birthDate = '생년월일을 입력해주세요';
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'year' || name === 'month' || name === 'day') {
      setFormData(prev => ({
        ...prev,
        birthDate: {
          ...prev.birthDate,
          [name]: value,
        },
      }));

      const updatedErrors = validate({
        ...formData,
        birthDate: {
          ...formData.birthDate,
          [name]: value,
        },
      });
      setErrors(prev => ({
        ...prev,
        birthDate: updatedErrors.birthDate,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));

      const updatedErrors = validate({
        ...formData,
        [name]: value,
      });
      setErrors(prev => ({
        ...prev,
        [name]: updatedErrors[name],
      }));
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        //회원가입
        const userCredential = await createUserWithEmailAndPassword(auth, formData.userEmail, formData.userPassword);
        const user = userCredential.user;

        //USER Collection에 user.uid를 ID로 사용자 정보 저장 문서 생성
        const userDoc = doc(USER_COLLECTION, user.uid);
        //아래 정보 저장
        await setDoc(userDoc, {
          uid: user.uid,
          email: formData.userEmail,
          username: formData.userName,
          gender: formData.gender,
          birthDate: formData.birthDate,
        });

        //사용자 ID를 localStorage에 저장
        localStorage.setItem('userUID', user.uid);

        //성공 시 이동
        navigate('/signupsize');
      } catch (err) {
        if (err instanceof FirebaseError) {
          switch (err.code) {
            case 'auth/weak-password':
              alert('안전하지 않은 비밀번호입니다.');
              break;
            case 'auth/email-already-in-use':
              alert('이미 가입된 이메일입니다.');
              break;
            default:
              alert('회원가입에 실패했습니다. 다시 시도해 주세요.');
              break;
          }
        }
      }
    }
  };

  const [modalHeight, setModalHeight] = useState<string>('612px');

  useEffect(() => {
    const errorMessages = Object.values(errors).filter(Boolean);
    const additionalHeight = errorMessages.length * 20;
    setModalHeight(`${Math.max(612, 612 + additionalHeight)}px`);
  }, [errors]);

  return (
    <div className={responsiveBox}>
      <div className={fullContainer}>
        <div>
          <Header imageSrc={hamburger_menu} alt="hamburger menu" />
        </div>

        <div>
          <Modal title="회원가입" height={modalHeight} initialHeight="612px" animateHeightOnClick={false}>
            <div className={signupFormContainer}>
              <div>
                <Input
                  label="아이디"
                  type="email"
                  name="userEmail"
                  id="userEmail1"
                  placeholder="이메일을 입력해주세요"
                  value={formData.userEmail}
                  onChange={handleChange}
                />
                {errors.userEmail && <div className={errorMessage}>{errors.userEmail}</div>}
              </div>

              <div className={signupFormGap}>
                <Input
                  label="비밀번호"
                  type="password"
                  name="userPassword"
                  id="userPassword"
                  placeholder="비밀번호를 입력해주세요"
                  value={formData.userPassword}
                  onChange={handleChange}
                />
                {errors.userPassword && <div className={errorMessage}>{errors.userPassword}</div>}
              </div>

              <div className={signupFormGap}>
                <Input
                  label="이름"
                  type="text"
                  name="userName"
                  id="userName"
                  placeholder="이름을 입력해 주세요"
                  value={formData.userName}
                  onChange={handleChange}
                />
                {errors.userName && <div className={errorMessage}>{errors.userName}</div>}
              </div>

              <div className={signupFormGap}>
                <Select
                  id="gender"
                  label="성별"
                  options={[
                    { value: '', label: '성별을 선택해 주세요' },
                    { value: 'male', label: '남성' },
                    { value: 'female', label: '여성' },
                  ]}
                  value={formData.gender}
                  onChange={handleChange}
                />
                {errors.gender && <div className={errorMessage}>{errors.gender}</div>}
              </div>

              <div className={signupFormGap}>
                <DateSelect
                  label="생년월일"
                  value={{
                    year: formData.birthDate.year,
                    month: formData.birthDate.month,
                    day: formData.birthDate.day,
                  }}
                  onChange={handleChange}
                />
                {errors.birthDate && <div className={errorMessage}>{errors.birthDate}</div>}
              </div>

              <div className={submitbuttonContainer}>
                <form onSubmit={handleSubmit}>
                  <Button text="다음" />
                </form>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default SignUpInfoInputValid;
