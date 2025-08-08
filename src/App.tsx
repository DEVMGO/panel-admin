import { Button, ConfigProvider, Form, Input } from "antd"
import type { Rule } from "antd/es/form";
import { useState } from "react";
// import { useState } from "react";

interface FormValues {
  username: string;
  password: string;
  confirmPassword: string;
}

function App() {
  const [form] = Form.useForm();
  const [passwordRules, setPasswordRules] = useState({
    minLength: false,
    hasLowercase: false,
    hasUppercase: false,
    hasNumber: false,
    hasSymbol: false,
  });

  const onFinish = (values: FormValues) => {
    console.log('فرم با موفقیت ارسال شد:', values);
  };

  const validateUsername = (_: Rule, value: string): Promise<void> => {
    if (!value) {
      return Promise.reject(new Error('لطفاً نام کاربری را وارد کنید!'));
    }
    if (value.trim().length === 0) {
      return Promise.reject(new Error('نام کاربری نمی‌تواند فقط فاصله باشد!'));
    }
    if (value.startsWith(' ')) {
      return Promise.reject(new Error('نام کاربری نمی‌تواند با فاصله شروع شود!'));
    }
    if (!/^[\u0600-\u06FF\s]+$/.test(value)) {
      return Promise.reject(new Error('نام کاربری باید فقط شامل حروف فارسی باشد!'));
    }
    return Promise.resolve();
  };



  const validatePassword = (_: Rule, value: string): Promise<void> => {
    if (!value) {
      return Promise.reject(new Error('لطفاً رمز عبور را وارد کنید!'));
    }
    const minLength = value.length >= 8;
    const hasLowercase = /[a-z]/.test(value);
    const hasUppercase = /[A-Z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSymbol: boolean = /[@#$%^&*()_+={}[\]|;:'",.<>?/]/.test(value);

    setPasswordRules({
      minLength,
      hasLowercase,
      hasUppercase,
      hasNumber,
      hasSymbol,
    });

    if (!minLength) {
      return Promise.reject(new Error('رمز عبور باید حداقل 8 کاراکتر باشد!'));
    }
    if (!hasLowercase) {
      return Promise.reject(new Error('رمز عبور باید شامل حروف کوچک انگلیسی باشد!'));
    }
    if (!hasUppercase) {
      return Promise.reject(new Error('رمز عبور باید شامل حروف بزرگ انگلیسی باشد!'));
    }
    if (!hasNumber) {
      return Promise.reject(new Error('رمز عبور باید شامل عدد باشد!'));
    }
    if (!hasSymbol) {
      return Promise.reject(new Error('رمز عبور باید شامل نمادهایی مثل @ یا / باشد!'));
    }
    return Promise.resolve();
  };


  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value: string = e.target.value;
    setPasswordRules({
      minLength: value.length >= 8,
      hasLowercase: /[a-z]/.test(value),
      hasUppercase: /[A-Z]/.test(value),
      hasNumber: /[0-9]/.test(value),
      hasSymbol: /[@#$%^&*()_+={}[\]|;:'",.<>?/]/.test(value),
    });
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Vazir, sans-serif',
        },
      }}
    >
      <div className="page-style">
        <h1 className="text-2xl font-bold mb-6 text-center">فرم ثبت‌نام</h1>
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          layout="vertical"
          scrollToFirstError
          style={{
            width: '320px'
          }}
        >
          <Form.Item
            name="username"
            label="نام کاربری"
            rules={[{ validator: validateUsername }]}
            hasFeedback
          >
            <Input placeholder="نام کاربری (فقط حروف فارسی)" />
          </Form.Item>

          <Form.Item
            name="password"
            label="رمز عبور"
            rules={[{ validator: validatePassword }]}
            hasFeedback
          >
            <Input.Password
              placeholder="رمز عبور"
              onChange={handlePasswordChange}
            />
          </Form.Item>

          <div style={{ width: '100%' }}>
            <div className="password-rule">
              <svg viewBox="0 0 24 24" fill={passwordRules.minLength ? '#52c41a' : '#d9d9d9'}>
                <path d={passwordRules.minLength ? "M20.485 3.515l-8.485 8.485-3.536-3.536-2.829 2.829 6.364 6.364 11.314-11.314z" : "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"} />
              </svg>
              <span className={passwordRules.minLength ? 'text-green-500' : 'text-gray-500'}>
                حداقل 8 کاراکتر
              </span>
            </div>
            <div className="password-rule">
              <svg viewBox="0 0 24 24" fill={passwordRules.hasLowercase ? '#52c41a' : '#d9d9d9'}>
                <path d={passwordRules.hasLowercase ? "M20.485 3.515l-8.485 8.485-3.536-3.536-2.829 2.829 6.364 6.364 11.314-11.314z" : "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"} />
              </svg>
              <span className={passwordRules.hasLowercase ? 'text-green-500' : 'text-gray-500'}>
                حروف کوچک انگلیسی
              </span>
            </div>
            <div className="password-rule">
              <svg viewBox="0 0 24 24" fill={passwordRules.hasUppercase ? '#52c41a' : '#d9d9d9'}>
                <path d={passwordRules.hasUppercase ? "M20.485 3.515l-8.485 8.485-3.536-3.536-2.829 2.829 6.364 6.364 11.314-11.314z" : "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"} />
              </svg>
              <span className={passwordRules.hasUppercase ? 'text-green-500' : 'text-gray-500'}>
                حروف بزرگ انگلیسی
              </span>
            </div>
            <div className="password-rule">
              <svg viewBox="0 0 24 24" fill={passwordRules.hasNumber ? '#52c41a' : '#d9d9d9'}>
                <path d={passwordRules.hasNumber ? "M20.485 3.515l-8.485 8.485-3.536-3.536-2.829 2.829 6.364 6.364 11.314-11.314z" : "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"} />
              </svg>
              <span className={passwordRules.hasNumber ? 'text-green-500' : 'text-gray-500'}>
                حداقل یک عدد
              </span>
            </div>
            <div className="password-rule">
              <svg viewBox="0 0 24 24" fill={passwordRules.hasSymbol ? '#52c41a' : '#d9d9d9'}>
                <path d={passwordRules.hasSymbol ? "M20.485 3.515l-8.485 8.485-3.536-3.536-2.829 2.829 6.364 6.364 11.314-11.314z" : "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"} />
              </svg>
              <span className={passwordRules.hasSymbol ? 'text-green-500' : 'text-gray-500'}>
                حداقل یک نماد (@، / و غیره)
              </span>
            </div>
          </div>

          <Form.Item
            name="confirmPassword"
            label="تأیید رمز عبور"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'لطفاً رمز عبور را تأیید کنید!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('رمزهای عبور مطابقت ندارند!'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="تأیید رمز عبور" />
          </Form.Item>

          <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              type="primary"
              htmlType="submit"
              className="submit-button"
            >
              ثبت‌نام
            </Button>
          </Form.Item>
        </Form>
      </div>
    </ConfigProvider>
  )
}

export default App
