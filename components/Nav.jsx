"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setUpProviders();
  }, []);

  return (
    <nav className="flex-between w-full mt-1 mb-16 pt-3">
      <section className="flex gap-10">
        <Link href="/" className="flex gap-2 flex-center">
          <Image
            src={"/assets/images/logo.png"}
            width={80}
            height={50}
            alt="logo"
          />
          <p className="logo_text">EtherWriter.ai</p>
        </Link>
        <div className="flex gap-5 mt-6 pt-2">
          <div>
            <Link href="/">
              <h1 className="nav_items">About</h1>
            </Link>
          </div>
          <div>
            <Link href="/">
              <h1 className="nav_items">Pricing</h1>
            </Link>
          </div>
        </div>
      </section>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/generate-prompt" className="btn">
              Generate Prompt
            </Link>

            <Image
              src={session?.user.image}
              width={50}
              height={37}
              className="rounded-full cursor-pointer transition duration-150 ease-in-out"
              alt="profile"
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div
                className={`dropdown ${
                  toggleDropdown ? "slide-down" : "slide-up"
                }`}
              >
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/settings"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Settings
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-2 w-full btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <div className="flex gap-3">
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => {
                      signIn(provider.id);
                    }}
                    className="yellow_btn"
                  >
                    Get Started
                  </button>
                </div>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src="/assets/images/profile.png"
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div
                className={`dropdown ${
                  toggleDropdown ? "slide-down" : "slide-up"
                }`}
              >
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/settings"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Settings
                </Link>

                <Link href="/generate-prompt" className="btn w-full mt-2">
                  Generate Prompt
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-2 w-full btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="black_btn"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
