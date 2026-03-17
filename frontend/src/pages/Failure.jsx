import { FaCircleExclamation } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Failure = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center flex-col gap-y-4 w-screen h-screen relative">
      <div className="flex justify-center items-center text-red-500 text-5xl">
        <FaCircleExclamation />
      </div>
      <h1 className="font-medium text-3xl">Payment Failed</h1>
      <p className="text-slate-500 max-w-100 text-center">
        We couldn't process your payment for this booking. Please retry and if
        this problem persist check your balance or try a different number
      </p>
      <button
        className="text-white bg-primary py-2 rounded-md px-6"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
  );
};

export default Failure;
