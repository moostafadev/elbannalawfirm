import React from "react";
import Animation from "./Animation";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { MapPin, Phone } from "lucide-react";

const Footer = () => {
  const t = useTranslations("Footer");
  const tLinks = useTranslations("Links");
  const locale = useLocale();
  const headerLinks = ["about", "services", "blog", "team", "FAQs", "contact"];

  return (
    <footer className="pt-12 bg-[#75600a] text-white flex flex-col gap-12 overflow-hidden">
      <div className="container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        <div className="flex flex-col gap-4">
          <Link href={"/"} className="flex-1 flex justify-center items-center">
            <Animation>
              <Image
                src={"/logo/logo.png"}
                alt="elbanna"
                width={1000}
                height={1000}
                className="max-w-[100px] h-auto"
              />
            </Animation>
          </Link>
          <div className="flex flex-col items-center">
            <Animation>
              <h2 className="text-lg font-semibold text-center">
                {t("title")}
              </h2>
            </Animation>
            <Animation>
              <p className="text-base text-center">{t("paragraph")}.</p>
            </Animation>
          </div>
        </div>
        <div className="w-fit xl:mx-auto flex flex-col gap-4">
          <Animation>
            <h2 className="text-lg font-semibold">{t("headLinks")}</h2>
          </Animation>
          <ul className="flex flex-col gap-2">
            {headerLinks.map((item) => (
              <li
                key={item}
                className={`content-data w-fit hover:mr-2 hover:text-primary duration-300 flex items-center relative before:w-0 before:h-[2px] before:bg-primary before:-bottom-[2px] hover:before:w-full before:absolute before:duration-300 ${
                  locale === "ar" ? "before:right-0" : "before:left-0"
                }`}
              >
                <Link href={`#${item}`}>{tLinks(item)}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-fit xl:mx-auto flex flex-col gap-4">
          <Animation>
            <h2 className="text-lg font-semibold">{t("follow")}</h2>
          </Animation>
          <ul className="flex flex-col gap-3">
            <li
              className={`content-data w-fit hover:mr-2 duration-300 flex items-center relative before:w-0 before:h-[2px] before:bg-primary before:-bottom-[4px] hover:before:w-full before:absolute before:duration-300 ${
                locale === "ar" ? "before:right-0" : "before:left-0"
              }`}
            >
              <Link
                href={"https://www.facebook.com/AhmedElbannaLawyer"}
                target="_blank"
                className="flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 32 32"
                  fill="white"
                >
                  <path d="M16,2c-7.732,0-14,6.268-14,14,0,6.566,4.52,12.075,10.618,13.588v-9.31h-2.887v-4.278h2.887v-1.843c0-4.765,2.156-6.974,6.835-6.974,.887,0,2.417,.174,3.043,.348v3.878c-.33-.035-.904-.052-1.617-.052-2.296,0-3.183,.87-3.183,3.13v1.513h4.573l-.786,4.278h-3.787v9.619c6.932-.837,12.304-6.74,12.304-13.897,0-7.732-6.268-14-14-14Z"></path>
                </svg>
                <span>{t("facebook")}</span>
              </Link>
            </li>
            <li
              className={`content-data w-fit hover:mr-2 duration-300 flex items-center relative before:w-0 before:h-[2px] before:bg-primary before:-bottom-[4px] hover:before:w-full before:absolute before:duration-300 ${
                locale === "ar" ? "before:right-0" : "before:left-0"
              }`}
            >
              <Link
                href={"https://www.instagram.com/ahmed_elbanna_lawyer"}
                target="_blank"
                className="flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 32 32"
                  fill="white"
                >
                  <path d="M10.202,2.098c-1.49,.07-2.507,.308-3.396,.657-.92,.359-1.7,.84-2.477,1.619-.776,.779-1.254,1.56-1.61,2.481-.345,.891-.578,1.909-.644,3.4-.066,1.49-.08,1.97-.073,5.771s.024,4.278,.096,5.772c.071,1.489,.308,2.506,.657,3.396,.359,.92,.84,1.7,1.619,2.477,.779,.776,1.559,1.253,2.483,1.61,.89,.344,1.909,.579,3.399,.644,1.49,.065,1.97,.08,5.771,.073,3.801-.007,4.279-.024,5.773-.095s2.505-.309,3.395-.657c.92-.36,1.701-.84,2.477-1.62s1.254-1.561,1.609-2.483c.345-.89,.579-1.909,.644-3.398,.065-1.494,.081-1.971,.073-5.773s-.024-4.278-.095-5.771-.308-2.507-.657-3.397c-.36-.92-.84-1.7-1.619-2.477s-1.561-1.254-2.483-1.609c-.891-.345-1.909-.58-3.399-.644s-1.97-.081-5.772-.074-4.278,.024-5.771,.096m.164,25.309c-1.365-.059-2.106-.286-2.6-.476-.654-.252-1.12-.557-1.612-1.044s-.795-.955-1.05-1.608c-.192-.494-.423-1.234-.487-2.599-.069-1.475-.084-1.918-.092-5.656s.006-4.18,.071-5.656c.058-1.364,.286-2.106,.476-2.6,.252-.655,.556-1.12,1.044-1.612s.955-.795,1.608-1.05c.493-.193,1.234-.422,2.598-.487,1.476-.07,1.919-.084,5.656-.092,3.737-.008,4.181,.006,5.658,.071,1.364,.059,2.106,.285,2.599,.476,.654,.252,1.12,.555,1.612,1.044s.795,.954,1.051,1.609c.193,.492,.422,1.232,.486,2.597,.07,1.476,.086,1.919,.093,5.656,.007,3.737-.006,4.181-.071,5.656-.06,1.365-.286,2.106-.476,2.601-.252,.654-.556,1.12-1.045,1.612s-.955,.795-1.608,1.05c-.493,.192-1.234,.422-2.597,.487-1.476,.069-1.919,.084-5.657,.092s-4.18-.007-5.656-.071M21.779,8.517c.002,.928,.755,1.679,1.683,1.677s1.679-.755,1.677-1.683c-.002-.928-.755-1.679-1.683-1.677,0,0,0,0,0,0-.928,.002-1.678,.755-1.677,1.683m-12.967,7.496c.008,3.97,3.232,7.182,7.202,7.174s7.183-3.232,7.176-7.202c-.008-3.97-3.233-7.183-7.203-7.175s-7.182,3.233-7.174,7.203m2.522-.005c-.005-2.577,2.08-4.671,4.658-4.676,2.577-.005,4.671,2.08,4.676,4.658,.005,2.577-2.08,4.671-4.658,4.676-2.577,.005-4.671-2.079-4.676-4.656h0"></path>
                </svg>
                <span>{t("instagram")}</span>
              </Link>
            </li>
            <li
              className={`content-data w-fit hover:mr-2 duration-300 flex items-center relative before:w-0 before:h-[2px] before:bg-primary before:-bottom-[4px] hover:before:w-full before:absolute before:duration-300 ${
                locale === "ar" ? "before:right-0" : "before:left-0"
              }`}
            >
              <Link
                href={"https://www.tiktok.com/@ahmedelbanna65"}
                target="_blank"
                className="flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 32 32"
                  fill="white"
                >
                  <path d="M24.562,7.613c-1.508-.983-2.597-2.557-2.936-4.391-.073-.396-.114-.804-.114-1.221h-4.814l-.008,19.292c-.081,2.16-1.859,3.894-4.039,3.894-.677,0-1.315-.169-1.877-.465-1.288-.678-2.169-2.028-2.169-3.582,0-2.231,1.815-4.047,4.046-4.047,.417,0,.816,.069,1.194,.187v-4.914c-.391-.053-.788-.087-1.194-.087-4.886,0-8.86,3.975-8.86,8.86,0,2.998,1.498,5.65,3.783,7.254,1.439,1.01,3.19,1.606,5.078,1.606,4.886,0,8.86-3.975,8.86-8.86V11.357c1.888,1.355,4.201,2.154,6.697,2.154v-4.814c-1.345,0-2.597-.4-3.647-1.085Z"></path>
                </svg>
                <span>{t("tiktok")}</span>
              </Link>
            </li>
            <li
              className={`content-data w-fit hover:mr-2 duration-300 flex items-center relative before:w-0 before:h-[2px] before:bg-primary before:-bottom-[4px] hover:before:w-full before:absolute before:duration-300 ${
                locale === "ar" ? "before:right-0" : "before:left-0"
              }`}
            >
              <Link
                href={
                  "https://www.linkedin.com/in/ahmed-elbanna-lawyer-369527297"
                }
                target="_blank"
                className="flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 32 32"
                  fill="white"
                >
                  <path
                    d="M26.111,3H5.889c-1.595,0-2.889,1.293-2.889,2.889V26.111c0,1.595,1.293,2.889,2.889,2.889H26.111c1.595,0,2.889-1.293,2.889-2.889V5.889c0-1.595-1.293-2.889-2.889-2.889ZM10.861,25.389h-3.877V12.87h3.877v12.519Zm-1.957-14.158c-1.267,0-2.293-1.034-2.293-2.31s1.026-2.31,2.293-2.31,2.292,1.034,2.292,2.31-1.026,2.31-2.292,2.31Zm16.485,14.158h-3.858v-6.571c0-1.802-.685-2.809-2.111-2.809-1.551,0-2.362,1.048-2.362,2.809v6.571h-3.718V12.87h3.718v1.686s1.118-2.069,3.775-2.069,4.556,1.621,4.556,4.975v7.926Z"
                    fillRule="evenodd"
                  ></path>
                </svg>
                <span>{t("linkedin")}</span>
              </Link>
            </li>
            <li
              className={`content-data w-fit hover:mr-2 duration-300 flex items-center relative before:w-0 before:h-[2px] before:bg-primary before:-bottom-[4px] hover:before:w-full before:absolute before:duration-300 ${
                locale === "ar" ? "before:right-0" : "before:left-0"
              }`}
            >
              <Link
                href={"https://youtube.com/@ahmed-elbanna1"}
                target="_blank"
                className="flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 32 32"
                  fill="white"
                >
                  <path d="M31.331,8.248c-.368-1.386-1.452-2.477-2.829-2.848-2.496-.673-12.502-.673-12.502-.673,0,0-10.007,0-12.502,.673-1.377,.37-2.461,1.462-2.829,2.848-.669,2.512-.669,7.752-.669,7.752,0,0,0,5.241,.669,7.752,.368,1.386,1.452,2.477,2.829,2.847,2.496,.673,12.502,.673,12.502,.673,0,0,10.007,0,12.502-.673,1.377-.37,2.461-1.462,2.829-2.847,.669-2.512,.669-7.752,.669-7.752,0,0,0-5.24-.669-7.752ZM12.727,20.758V11.242l8.364,4.758-8.364,4.758Z"></path>
                </svg>
                <span>{t("youtube")}</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-fit xl:mx-auto flex flex-col gap-4">
          <Animation>
            <h2 className="text-lg font-semibold">{t("address")}</h2>
          </Animation>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2 mr-2">
              <Animation>
                <h3 className="font-semibold">
                  {locale === "ar"
                    ? "العنوان"
                    : locale === "en"
                    ? "Address"
                    : "Adresse"}
                </h3>
              </Animation>
              <Animation>
                <Link
                  href="https://www.google.com/maps/place/%D8%A7%D8%AD%D9%85%D8%AF+%D8%A7%D9%84%D8%A8%D9%86%D8%A7+%D8%A7%D9%84%D9%85%D8%AD%D8%A7%D9%85%D9%89%D8%8C+3+%D8%B9%D9%85%D8%A7%D8%B1%D8%A7%D8%AA+%D8%A7%D9%84%D8%B4%D8%B1%D9%8A%D9%81%D8%8C+%D8%B4%D8%A7%D8%B1%D8%B9+%D8%A7%D8%B3%D9%88%D8%A7%D9%86%D8%8C+%D9%82%D8%B3%D9%85+%D9%85%D8%B5%D8%B1+%D8%A7%D9%84%D8%AC%D8%AF%D9%8A%D8%AF%D8%A9%D8%8C+%D9%85%D8%AD%D8%A7%D9%81%D8%B8%D8%A9+%D8%A7%D9%84%D9%82%D8%A7%D9%87%D8%B1%D8%A9%E2%80%AC%E2%80%AD/data=!4m2!3m1!1s0x1458159d0de5b165:0xeb564c00e4ac4984?utm_source=mstt_1&entry=gps&coh=192189&g_ep=CAESCjExLjE0OS4xMDEYACDXggMqdSw5NDI0MjU2Miw5NDIyMzI5OSw5NDIxNjQxMyw5NDIxMjQ5Niw5NDIwNzM5NCw5NDIwNzUwNiw5NDIwODUwNiw5NDIxNzUyMyw5NDIxODY1Myw5NDIyOTgzOSw0NzA4NzExOCw0NzA4NDM5Myw5NDIxMzIwMEICRUc%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <MapPin />
                  <p>
                    {locale === "ar"
                      ? "3 عمارات الشريف، شارع اسوان، قسم مصر الجديدة، محافظة القاهرة."
                      : locale === "en"
                      ? "3 Al Sharif Buildings, Aswan Street, New Cairo District, Cairo Governorate."
                      : "3 Immeubles Al Sharif, Rue Aswan, Quartier du Nouveau Caire, Gouvernorat du Caire."}
                  </p>
                </Link>
              </Animation>
            </div>
            <div className="flex flex-col gap-2 mr-2">
              <Animation>
                <h3 className="font-semibold">
                  {locale === "ar"
                    ? "التواصل"
                    : locale === "en"
                    ? "Contact"
                    : "Contact"}
                </h3>
              </Animation>
              <Animation>
                <Link
                  href={"tel:+201000728654"}
                  target="_blank"
                  className="flex items-center gap-2"
                >
                  <Phone />
                  <p className="text-lg">01000728654</p>
                </Link>
              </Animation>
              <Animation>
                <Link
                  href={"https://api.whatsapp.com/send?phone=201000728654"}
                  target="_blank"
                  className="flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 32 32"
                    fill="white"
                  >
                    <path
                      d="M25.873,6.069c-2.619-2.623-6.103-4.067-9.814-4.069C8.411,2,2.186,8.224,2.184,15.874c-.001,2.446,.638,4.833,1.852,6.936l-1.969,7.19,7.355-1.929c2.026,1.106,4.308,1.688,6.63,1.689h.006c7.647,0,13.872-6.224,13.874-13.874,.001-3.708-1.44-7.193-4.06-9.815h0Zm-9.814,21.347h-.005c-2.069,0-4.099-.557-5.87-1.607l-.421-.25-4.365,1.145,1.165-4.256-.274-.436c-1.154-1.836-1.764-3.958-1.763-6.137,.003-6.358,5.176-11.531,11.537-11.531,3.08,.001,5.975,1.202,8.153,3.382,2.177,2.179,3.376,5.077,3.374,8.158-.003,6.359-5.176,11.532-11.532,11.532h0Zm6.325-8.636c-.347-.174-2.051-1.012-2.369-1.128-.318-.116-.549-.174-.78,.174-.231,.347-.895,1.128-1.098,1.359-.202,.232-.405,.26-.751,.086-.347-.174-1.464-.54-2.788-1.72-1.03-.919-1.726-2.054-1.929-2.402-.202-.347-.021-.535,.152-.707,.156-.156,.347-.405,.52-.607,.174-.202,.231-.347,.347-.578,.116-.232,.058-.434-.029-.607-.087-.174-.78-1.88-1.069-2.574-.281-.676-.567-.584-.78-.595-.202-.01-.433-.012-.665-.012s-.607,.086-.925,.434c-.318,.347-1.213,1.186-1.213,2.892s1.242,3.355,1.416,3.587c.174,.232,2.445,3.733,5.922,5.235,.827,.357,1.473,.571,1.977,.73,.83,.264,1.586,.227,2.183,.138,.666-.1,2.051-.839,2.34-1.649,.289-.81,.289-1.504,.202-1.649s-.318-.232-.665-.405h0Z"
                      fill-rule="evenodd"
                    ></path>
                  </svg>
                  <p className="text-lg">01000728654</p>
                </Link>
              </Animation>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center sm:py-4 py-3 border-t-2 border-primary">
        <p className="text-center text-xs md:text-base">
          {locale === "ar" ? (
            <>
              جميع الحقوق محفوظة لدي <strong>مكتب أحمد البنا</strong> و تم
              تطويره من قبل{" "}
              <a
                href="https://moostafadev.github.io/Mostafa_Website"
                target="_blank"
                className="font-bold hover:text-primary duration-300"
              >
                مصطفى أحمد
              </a>
              .
            </>
          ) : locale === "en" ? (
            <>
              All rights reserved to <strong>Ahmed Elbanna Law Firm</strong>,
              developed by{" "}
              <a
                href="https://moostafadev.github.io/Mostafa_Website"
                target="_blank"
                className="font-bold hover:text-primary duration-300"
              >
                Mostafa Ahmed
              </a>
              .
            </>
          ) : (
            <>
              Tous droits réservés au{" "}
              <strong>cabinet d&apos;Avocats Ahmed Elbanna</strong>, développé
              par{" "}
              <a
                href="https://moostafadev.github.io/Mostafa_Website"
                target="_blank"
                className="font-bold hover:text-primary duration-300"
              >
                Mostafa Ahmed
              </a>
              .
            </>
          )}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
