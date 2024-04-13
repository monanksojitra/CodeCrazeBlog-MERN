import React from "react";

const SocialLink = () => {
  return (
    <div className="flex py-10 items-center justify-center bg-white dark:bg-gray-900">
      <div className="container grid max-w-7xl gap-8 lg:grid-cols-2 lg:grid-rows-2">
        <div className="row-span-2 flex flex-col rounded-md border border-slate-200">
          <div className="h-1/2 flex-1">
            <img
              src="https://d33wubrfki0l68.cloudfront.net/c43307b88fb814366e4f3a181c788796cba83faa/4c05c/new/landing/omnichannel.png"
              className="w-full object-cover object-right-top"
              alt="omnichannel"
            />
          </div>
          <div className="p-10">
            <h3 className="text-xl font-medium text-gray-700 dark:text-white">
              Omnichannel support center
            </h3>
            <p className="mt-2 text-slate-500 dark:text-slate-200">
              Chatwoot connects with popular customer communication channels
              like Email, Website live-chat, Facebook, Twitter, WhatsApp,
              Instagram, Line, etc., and helps you deliver a consistent customer
              experience across channels.
            </p>
            <a href="" className="mt-2 inline-flex text-sky-500">
              Read More →
            </a>
          </div>
        </div>
        <div className="flex rounded-md border border-slate-200">
          <div className="flex-1 p-10">
            <h3 className="text-xl font-medium text-gray-700 dark:text-white">
              A live-chat that fits your brand
            </h3>
            <p className="mt-2 text-slate-500 dark:text-slate-200">
              Connect with your website visitors, communicate with them in
              realtime and give them quality support with a live-chat widget
              that fits your brand.
            </p>
            <a href="" className="mt-2 inline-flex text-sky-500">
              Read More →
            </a>
          </div>
          <div className="relative hidden h-full w-1/3 overflow-hidden lg:block">
            <div className="absolute inset-0">
              <img
                src="https://d33wubrfki0l68.cloudfront.net/e5290c26cc1703e54e0afe3d1472046098ecd819/53775/new/landing/live-chat.png"
                className="h-full w-full object-cover object-left-top"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="flex rounded-md border border-slate-200">
          <div className="flex-1 p-10">
            <h3 className="text-xl font-medium text-gray-700 dark:text-white">
              Respond faster, with automated chatbots
            </h3>
            <p className="mt-2 text-slate-500 dark:text-slate-200">
              Integrate with chatbots using Rasa or Dialogflow to automate
              conversations. Qualify using chatbots and seamlessly handoff to
              human agents.
            </p>
            <a href="" className="mt-2 inline-flex text-sky-500">
              Read More →
            </a>
          </div>
          <div className="relative hidden h-full w-1/3 overflow-hidden lg:block">
            <div className="absolute inset-0">
              <img
                src="https://d33wubrfki0l68.cloudfront.net/1205a454c4b64452a51930c9b0043f8db9ff8271/d202e/new/landing/chat-bot.png"
                className="h-full w-full object-cover object-left-top"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialLink;
