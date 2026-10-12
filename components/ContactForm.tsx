"use client";

import React, { useMemo, useState } from "react";
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
import { toLocaleKey } from "@/lib/locale";
import {
  CONTACT_STATES,
  CONTACT_TEXTS,
  CONTACT_VALIDATION,
} from "@/constants/contact";

const ContactForm = () => {
  const t = useTranslations("HomePage");
  const locale = toLocaleKey(useLocale());
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const v = CONTACT_VALIDATION[locale];
  const texts = CONTACT_TEXTS[locale];
  const states = CONTACT_STATES[locale];

  const formSchema = useMemo(
    () =>
      z.object({
        name: z.string({ required_error: v.name.required }).min(2, {
          message: v.name.min,
        }),
        phone: z
          .string({ required_error: v.phone.required })
          .refine((value) => /^\d{10}$/.test(value), {
            message: v.phone.invalid,
          }),
        age: z
          .number({ required_error: v.age.required })
          .refine((value) => !Number.isNaN(value), {
            message: v.age.invalid,
          }),
        state: z
          .string({ required_error: v.state.required })
          .min(1, { message: v.state.required }),
        subject: z
          .string({ required_error: v.subject.required })
          .min(3, { message: v.subject.min })
          .max(1000, { message: v.subject.max }),
      }),
    [v],
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { state: "القاهرة" },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    toast({
      title: texts.note,
      description: texts.redirecting,
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
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${texts.whatsappPhone}&text=${encodedResult}`;

    window.location.href = whatsappUrl;
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="content-data flex-1">
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
                <FormItem className="content-data flex-1">
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

          <div className="flex flex-col gap-4 md:flex-row">
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem className="content-data flex-1">
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
                <FormItem className="content-data flex-1">
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
                        {states.map((state) => (
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

        <CustomButton
          type="submit"
          size="fit"
          color="yellow"
          className="content-data self-end"
          isLoading={isLoading}
        >
          {texts.submit}
        </CustomButton>
      </form>
    </Form>
  );
};

export default ContactForm;
