"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import CustomButton from "./CustomButton";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input/input";
import { useLocale, useTranslations } from "next-intl";
import { changeDataToNumber } from "@/helpers/convertValueToNumber";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";

const messages = {
  ar: {
    name: {
      required: "يجب إدخال الاسم.",
      min: "يجب أن يتكون الاسم من حرفين على الأقل.",
    },
    phone: {
      required: "يرجى إدخال رقم الهاتف.",
      invalid: "رقم الهاتف غير صالح.",
    },
    age: {
      required: "يرجى إدخال العمر.",
      invalid: "العمر يجب أن يكون رقمًا.",
    },
    state: {
      required: "يرجى تحديد المحافظة.",
    },
    subject: {
      required: "يرجى إدخال الموضوع.",
      min: "يجب أن يتكون الموضوع من 3 أحرف على الأقل.",
      max: "يجب أن لا يتجاوز الموضوع 1000 حرف.",
    },
  },
  en: {
    name: {
      required: "Name is required.",
      min: "Username must be at least 2 characters.",
    },
    phone: {
      required: "Phone number is required.",
      invalid: "Phone number is invalid.",
    },
    age: {
      required: "Age is required.",
      invalid: "Age must be a number.",
    },
    state: {
      required: "State is required.",
    },
    subject: {
      required: "Subject is required.",
      min: "Subject must be at least 3 characters long.",
      max: "Subject must not exceed 1000 characters.",
    },
  },
  fr: {
    name: {
      required: "Le nom est requis.",
      min: "Le nom doit comporter au moins 2 caractères.",
    },
    phone: {
      required: "Le numéro de téléphone est requis.",
      invalid: "Le numéro de téléphone est invalide.",
    },
    age: {
      required: "L'âge est requis.",
      invalid: "L'âge doit être un nombre.",
    },
    state: {
      required: "L'état est requis.",
    },
    subject: {
      required: "Le sujet est requis.",
      min: "Le sujet doit comporter au moins 3 caractères.",
      max: "Le sujet ne doit pas dépasser 1000 caractères.",
    },
  },
};

const states = {
  ar: [
    { value: "القاهرة", label: "القاهرة" },
    { value: "الجيزة", label: "الجيزة" },
    { value: "الإسكندرية", label: "الإسكندرية" },
    { value: "الدقهلية", label: "الدقهلية" },
    { value: "الشرقية", label: "الشرقية" },
    { value: "البحيرة", label: "البحيرة" },
    { value: "الغربية", label: "الغربية" },
    { value: "المنوفية", label: "المنوفية" },
    { value: "القليوبية", label: "القليوبية" },
    { value: "الفيوم", label: "الفيوم" },
    { value: "بني سويف", label: "بني سويف" },
    { value: "المنيا", label: "المنيا" },
    { value: "أسيوط", label: "أسيوط" },
    { value: "سوهاج", label: "سوهاج" },
    { value: "قنا", label: "قنا" },
    { value: "أسوان", label: "أسوان" },
    { value: "الأقصر", label: "الأقصر" },
    { value: "دمياط", label: "دمياط" },
    { value: "بورسعيد", label: "بورسعيد" },
    { value: "الإسماعيلية", label: "الإسماعيلية" },
    { value: "السويس", label: "السويس" },
    { value: "مطروح", label: "مطروح" },
    { value: "شمال سيناء", label: "شمال سيناء" },
    { value: "جنوب سيناء", label: "جنوب سيناء" },
    { value: "البحر الأحمر", label: "البحر الأحمر" },
    { value: "الوادي الجديد", label: "الوادي الجديد" },
  ],
  en: [
    { value: "القاهرة", label: "Cairo" },
    { value: "الجيزة", label: "Giza" },
    { value: "الإسكندرية", label: "Alexandria" },
    { value: "الدقهلية", label: "Dakahlia" },
    { value: "الشرقية", label: "Sharqia" },
    { value: "البحيرة", label: "Beheira" },
    { value: "الغربية", label: "Gharbia" },
    { value: "المنوفية", label: "Menoufia" },
    { value: "القليوبية", label: "Qalyubia" },
    { value: "الفيوم", label: "Fayoum" },
    { value: "بني سويف", label: "Beni Suef" },
    { value: "المنيا", label: "Minya" },
    { value: "أسيوط", label: "Assiut" },
    { value: "سوهاج", label: "Sohag" },
    { value: "قنا", label: "Qena" },
    { value: "أسوان", label: "Aswan" },
    { value: "الأقصر", label: "Luxor" },
    { value: "دمياط", label: "Damietta" },
    { value: "بورسعيد", label: "Port Said" },
    { value: "الإسماعيلية", label: "Ismailia" },
    { value: "السويس", label: "Suez" },
    { value: "مطروح", label: "Matrouh" },
    { value: "شمال سيناء", label: "North Sinai" },
    { value: "جنوب سيناء", label: "South Sinai" },
    { value: "البحر الأحمر", label: "Red Sea" },
    { value: "الوادي الجديد", label: "New Valley" },
  ],
  fr: [
    { value: "القاهرة", label: "Le Caire" },
    { value: "الجيزة", label: "Gizeh" },
    { value: "الإسكندرية", label: "Alexandrie" },
    { value: "الدقهلية", label: "Dakahlia" },
    { value: "الشرقية", label: "Sharqia" },
    { value: "البحيرة", label: "Beheira" },
    { value: "الغربية", label: "Gharbia" },
    { value: "المنوفية", label: "Menoufia" },
    { value: "القليوبية", label: "Qalyubia" },
    { value: "الفيوم", label: "Fayoum" },
    { value: "بني سويف", label: "Beni Suef" },
    { value: "المنيا", label: "Minya" },
    { value: "أسيوط", label: "Assiout" },
    { value: "سوهاج", label: "Sohag" },
    { value: "قنا", label: "Qena" },
    { value: "أسوان", label: "Aswan" },
    { value: "الأقصر", label: "Luxor" },
    { value: "دمياط", label: "Damiette" },
    { value: "بورسعيد", label: "Port-Saïd" },
    { value: "الإسماعيلية", label: "Ismaïlia" },
    { value: "السويس", label: "Suez" },
    { value: "مطروح", label: "Matrouh" },
    { value: "شمال سيناء", label: "Sinai Nord" },
    { value: "جنوب سيناء", label: "Sinai Sud" },
    { value: "البحر الأحمر", label: "Mer Rouge" },
    { value: "الوادي الجديد", label: "Nouvelle Vallée" },
  ],
};

const ContactForm = () => {
  const t = useTranslations("HomePage");
  const locale = useLocale();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const formSchema = z.object({
    name: z
      .string({
        required_error: messages[locale as keyof typeof messages].name.required,
      })
      .min(2, {
        message: messages[locale as keyof typeof messages].name.min,
      }),
    phone: z
      .string({
        required_error:
          messages[locale as keyof typeof messages].phone.required,
      })
      .refine((value) => {
        const isValid = /^\d{10}$/.test(value);
        return (
          isValid || messages[locale as keyof typeof messages].phone.invalid
        );
      }),
    age: z
      .number({
        required_error: messages[locale as keyof typeof messages].age.required,
      })
      .refine((value) => !isNaN(value), {
        message: messages[locale as keyof typeof messages].age.invalid,
      }),
    state: z
      .string({
        required_error:
          messages[locale as keyof typeof messages].state.required,
      })
      .min(1, {
        message: messages[locale as keyof typeof messages].state.required,
      }),
    subject: z
      .string({
        required_error:
          messages[locale as keyof typeof messages].subject.required,
      })
      .min(3, {
        message: messages[locale as keyof typeof messages].subject.min,
      })
      .max(1000, {
        message: messages[locale as keyof typeof messages].subject.max,
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      state: "القاهرة",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    const message = {
      ar: "سيتم تحويلك إلى واتساب...",
      en: "You will be redirected to WhatsApp...",
      fr: "Vous allez être redirigé vers WhatsApp...",
    };

    toast({
      title: "ملاحظة",
      description: message[locale as keyof typeof message],
      duration: 2000,
    });

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const result = `
    -- استشارة قانوية --
    - الاسم: ${values.name.trim()}
    - السن: ${values.age} سنة
    - رقم الهاتف: ${values.phone}
    - محل الاقامة: ${values.state}
    - موضوع الاستشارة: 
    -- ${values.subject}
  `;
    const encodedResult = encodeURIComponent(result);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=201000728654&text=${encodedResult}`;

    window.location.href = whatsappUrl;

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex flex-col gap-4"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-1 content-data">
                  <FormLabel>{t("ContactSection.inputName")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("ContactSection.inputName")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="flex-1 content-data">
                  <FormLabel>{t("ContactSection.inputPhone")}</FormLabel>
                  <FormControl>
                    <PhoneInput
                      country="EG"
                      value={field.value}
                      onChange={field.onChange}
                      inputComponent={Input}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem className="flex-1 content-data">
                  <FormLabel>{t("ContactSection.inputAge")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={t("ContactSection.inputAge")}
                      onChange={(e) => changeDataToNumber(e, field)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="flex-1 content-data">
                  <FormLabel>{t("ContactSection.inputState")}</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      dir={locale === "ar" ? "rtl" : "ltr"}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("ContactSection.inputState")}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {states[locale as keyof typeof states].map((state) => (
                          <SelectItem key={state.value} value={state.value}>
                            {state.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem className="content-data">
                  <FormLabel>{t("ContactSection.inputSubject")}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("ContactSection.inputSubject")}
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <CustomButton
          type="submit"
          size="fit"
          color="yellow"
          className="content-data self-end"
          isLoading={isLoading}
        >
          {locale === "ar" ? "إرسال" : locale === "en" ? "Submit" : "Soumettre"}
        </CustomButton>
      </form>
    </Form>
  );
};

export default ContactForm;
