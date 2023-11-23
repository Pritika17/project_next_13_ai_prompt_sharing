import Image from "next/image";

const Login = () => {
  return (
    <div className="w-full flex flex-col flex-center align-middle mt-16">
      <h1 className="text-white text-7xl text-center font-extrabold leading-14">
        Write your <span className="orange_gradient">Research Paper</span> <br /> in seconds
      </h1>
      <p className="text-white text-2xl leading-loose mt-10">
        Your first research paper is just a Google sign-in away—start writing
        for free now!
      </p>
      <div className="mt-5">
        <button className="google_btn">
          <Image
            src="/assets/icons/google.png"
            width={30}
            height={30}
            alt="google icon"
          />
          Sign In With Google
        </button>
      </div>
    </div>
  );
};

export default Login;
