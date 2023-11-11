/* eslint-disable @next/next/no-img-element */
"use client";

import Header from "../../components/header";
import HomeContainer from "../../containers/HomeContainer";

import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Sopra Next Project</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Head>
      <main className="flex min-h-screen flex-col items-center py-24 px-2 lg:px-20 bg-gradient-to-br from-purple-900 via-blue-700 to-indigo-900">
        <div className="w-11/12 lg:w-[750px]">
          <Header />
          <div className="mt-10 w-full">
            <h1 className="text-left font-medium">
              LIST OF CITIES IN <br />
              <b className="text-6xl colored-text-temp bg-gradient-to-r from-[#002695] via-white to-[#ED2939]">
                FRANCE
              </b>
            </h1>

            <HomeContainer />
          </div>

          <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
            <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
              Sopra Banking
            </p>
            <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
              <div className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0">
                By <h3>Jose (CHEO) Molina</h3>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
