import OtpInput from "react-otp-input";

const OtpInputs = ({otp, setOtp}) => {

  return (
    <div className="flex justify-center items-center">
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        renderInput={(props) => <input {...props} />}
        inputStyle={{
          border: "1px solid #0DA6E1",
          marginInline: "5px",
          paddingInline: "10px",
          width: "40px",
          height: "40px",
          borderRadius: "5px"
        }}
      />
    </div>
  );
};

export default OtpInputs;
