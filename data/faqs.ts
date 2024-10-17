export interface FAQ {
  question: string;
  answer: string;
}

export interface FAQsData {
  [key: string]: FAQ[];
}

export const faqsData: FAQsData = {
  ar: [
    {
      question: "ما هي إجراءات تسجيل شقة تمليك في الشهر العقاري؟",
      answer:
        "إجراءات التسجيل تتطلب تقديم عقد البيع النهائي الموثق، شهادة التصرفات العقارية التي تثبت ملكية البائع، بالإضافة إلى سداد الرسوم القانونية. يتم تقديم الطلب للشهر العقاري بعد معاينة العقار والتأكد من مطابقة المستندات، وفي حالة قبول الطلب، يتم التسجيل رسميًا في السجل العقاري.",
    },
    {
      question: "ما هي الشروط المطلوبة لرفع دعوى خلع؟",
      answer:
        "يتطلب الخلع تنازل الزوجة عن جميع حقوقها المالية مثل مؤخر الصداق والنفقة، مع ضرورة رد مقدم الصداق للزوج. على الزوجة تقديم طلب رسمي للمحكمة وتوضيح أسباب استحالة استمرار الحياة الزوجية، ولا يُشترط موافقة الزوج على الخلع، وتفصل المحكمة في الدعوى بناءً على الشهادات والمستندات المقدمة.",
    },
    {
      question: "ما هي العقوبات القانونية في حالات النصب الإلكتروني؟",
      answer:
        "وفقًا لقانون مكافحة جرائم تقنية المعلومات، يعاقب كل من يرتكب جريمة نصب إلكتروني باستخدام الإنترنت بالحبس لمدة لا تقل عن سنة، وبغرامة لا تقل عن 50 ألف جنيه ولا تزيد عن 100 ألف جنيه، أو بإحدى هاتين العقوبتين. في بعض الحالات الخطيرة يمكن أن تصل العقوبة إلى السجن المشدد.",
    },
    {
      question: "كيف يمكن استرداد الشبكة والهدايا بعد فسخ الخطوبة؟",
      answer:
        "تعتبر الشبكة والهدايا في القانون المصري جزءًا من المهر، ويمكن للخطاب استردادها بعد فسخ الخطوبة. يتم رفع دعوى أمام المحكمة للمطالبة بها، على أن يثبت الخطيب أن الخطوبة قد فُسخت بناءً على أسباب خارجة عن إرادته، وتستند المحكمة في حكمها إلى العرف والعادات في مثل هذه القضايا.",
    },
    {
      question: "ما هي خطوات الطعن في حكم قضائي؟",
      answer:
        "الطعن في الأحكام القضائية يتم عبر تقديم استئناف لدى المحكمة المختصة خلال 40 يومًا من تاريخ صدور الحكم. يجب أن يتضمن الطعن مبررات قانونية واضحة مثل وجود خطأ في تطبيق القانون أو عيب في الإجراءات. بعد تقديم الطعن، يتم تحديد جلسة نظره أمام محكمة الاستئناف التي قد تؤيد الحكم الابتدائي أو تعدله أو تلغيه.",
    },
    {
      question: "كيف يمكن توثيق عقد الإيجار في الشهر العقاري؟",
      answer:
        "لتوثيق عقد الإيجار، يجب تقديم العقد الأصلي مصحوبًا ببطاقات الأطراف وسداد الرسوم القانونية المطلوبة. بعد ذلك يتم توثيق العقد وتسجيله رسميًا، ما يضمن حقوق الطرفين أمام القانون ويتيح إمكانية تنفيذ بنود العقد بالقوة الجبرية في حالة الإخلال.",
    },
    {
      question: "ما هي الشروط القانونية لتأسيس شركة في مصر؟",
      answer:
        "يجب تقديم عقد تأسيس الشركة الموثق لدى الشهر العقاري، وسجل تجاري من الغرفة التجارية، بالإضافة إلى البطاقة الضريبية. تُحدد نوع الشركة (مساهمة، تضامن، ذات مسؤولية محدودة) ويُشترط إيداع رأس المال في أحد البنوك، واستصدار موافقات الجهات المختصة مثل الهيئة العامة للاستثمار. وتعمل الهيئة على إصدار قوانين بشكل دائم لتخفيف الإجراءات لتسهيل الأمر على المستثمرين في مصر.",
    },
    {
      question: "كيف يمكن رفع دعوى إثبات نسب؟",
      answer:
        "يتم رفع الدعوى أمام محكمة الأسرة مع تقديم إفادة لواقعة الميلاد أو أي وثائق تثبت العلاقة الأبوية مثل تقارير الفحص الجيني (DNA). تعتمد المحكمة على الأدلة والشهادات المقدمة، وفي حالة ثبوت النسب يتم إصدار حكم قضائي يُلزم الطرف الآخر بالاعتراف بالنسب وما يترتب عليه من حقوق.",
    },
    {
      question: "ما هي حقوق العامل عند انتهاء عقد العمل؟",
      answer:
        "عند انتهاء عقد العمل، للعامل حقوق متعددة، منها استحقاق مكافأة نهاية الخدمة إذا كان قد قضى أكثر من خمس سنوات في العمل، بالإضافة إلى مستحقات الإجازات التي لم تُستخدم. يحق للعامل أيضًا التعويض في حالة الفصل التعسفي، كما يحق له الحصول على شهادة خبرة وتصفية كافة المستحقات المالية.",
    },
    {
      question: "ما هي العقوبات المتعلقة بجرائم السب والقذف في القانون المصري؟",
      answer:
        "تُعاقب جرائم السب والقذف بالحبس لمدة لا تزيد عن سنة وبغرامة مالية تتراوح بين 5 آلاف و20 ألف جنيه، أو بإحدى هاتين العقوبتين. إذا كان السب والقذف عبر وسائل الإعلام أو الإنترنت، فقد تكون العقوبة أشد نظرًا لتوسع نطاق الجريمة وضررها على الشخص المتضرر.",
    },
  ],
  en: [
    {
      question:
        "What are the procedures for registering a property in the Real Estate Registry?",
      answer:
        "The registration procedures require submitting the final authenticated sale contract, a certificate of property transactions proving the seller's ownership, and paying the legal fees. The application is submitted to the Real Estate Registry after inspecting the property and ensuring document compliance. If the application is accepted, it will be officially registered in the property registry.",
    },
    {
      question: "What are the requirements for filing for divorce?",
      answer:
        "Divorce requires the wife to waive all her financial rights, such as the dowry and alimony, and to return the dowry to the husband. The wife must file an official request to the court and explain the reasons for the impossibility of continuing the marriage. The husband's consent is not required for divorce, and the court decides the case based on the submitted testimonies and documents.",
    },
    {
      question: "What are the legal penalties for online fraud?",
      answer:
        "According to the Anti-Information Technology Crimes Law, anyone committing online fraud using the internet is punishable by imprisonment for no less than one year and a fine of no less than 50,000 Egyptian pounds and no more than 100,000 Egyptian pounds, or one of these penalties. In serious cases, the penalty may reach strict imprisonment.",
    },
    {
      question: "How can one recover the engagement gifts after a breakup?",
      answer:
        "Engagement gifts are considered part of the dowry in Egyptian law, and the fiancé can recover them after the breakup. A lawsuit must be filed with the court to claim them, and the fiancé must prove that the engagement was broken for reasons beyond his control. The court bases its ruling on customs and traditions in such cases.",
    },
    {
      question: "What are the steps to appeal a court ruling?",
      answer:
        "To appeal a court ruling, a petition must be submitted to the competent court within 40 days of the ruling date. The appeal must include clear legal justifications, such as an error in applying the law or a procedural flaw. After submitting the appeal, a hearing will be scheduled before the Court of Appeal, which may uphold, amend, or annul the initial ruling.",
    },
    {
      question:
        "How can one authenticate a lease contract in the Real Estate Registry?",
      answer:
        "To authenticate a lease contract, the original contract must be submitted along with the ID cards of the parties and the required legal fees. The contract will then be authenticated and officially registered, ensuring the rights of both parties under the law and allowing for the enforcement of contract terms through legal means in case of breach.",
    },
    {
      question:
        "What are the legal requirements to establish a company in Egypt?",
      answer:
        "To establish a company, a notarized company establishment contract must be submitted to the Real Estate Registry, along with a commercial register from the Chamber of Commerce and a tax card. The type of company (joint stock, partnership, limited liability) must be specified, and it is required to deposit the capital in a bank and obtain approvals from the relevant authorities, such as the General Investment Authority. The authority regularly issues laws to ease procedures for investors in Egypt.",
    },
    {
      question: "How can one file a paternity claim?",
      answer:
        "A paternity claim must be filed before the Family Court along with proof of birth or any documents proving parental relationship, such as DNA test reports. The court relies on the evidence and testimonies presented, and if paternity is established, a judicial ruling will be issued obliging the other party to acknowledge paternity and its related rights.",
    },
    {
      question:
        "What are the worker's rights upon termination of the employment contract?",
      answer:
        "Upon termination of an employment contract, workers have several rights, including entitlement to end-of-service compensation if they have worked for more than five years, as well as accrued vacation entitlements. Workers also have the right to compensation in cases of wrongful termination, and they are entitled to receive an experience certificate and settle all financial entitlements.",
    },
    {
      question:
        "What are the penalties for defamation and slander in Egyptian law?",
      answer:
        "Defamation and slander are punishable by imprisonment for no more than one year and a fine ranging from 5,000 to 20,000 Egyptian pounds, or one of these penalties. If the defamation or slander occurs through media or the internet, the penalty may be more severe due to the wider scope of the crime and its harm to the aggrieved person.",
    },
  ],
  fr: [
    {
      question:
        "Quelles sont les procédures pour enregistrer un bien dans le registre immobilier?",
      answer:
        "Les procédures d'enregistrement nécessitent la soumission du contrat de vente final authentifié, d'un certificat de transactions immobilières prouvant la propriété du vendeur et le paiement des frais légaux. La demande est soumise au registre immobilier après inspection du bien et vérification de la conformité des documents. Si la demande est acceptée, elle sera officiellement enregistrée dans le registre foncier.",
    },
    {
      question:
        "Quelles sont les conditions requises pour demander le divorce?",
      answer:
        "Le divorce nécessite que la femme renonce à tous ses droits financiers, tels que la dot et la pension alimentaire, et qu'elle restitue la dot au mari. La femme doit déposer une demande officielle auprès du tribunal et expliquer les raisons rendant impossible la poursuite du mariage. Le consentement du mari n'est pas requis pour le divorce, et le tribunal statue sur l'affaire sur la base des témoignages et des documents présentés.",
    },
    {
      question: "Quelles sont les pénalités légales pour fraude en ligne?",
      answer:
        "Selon la loi sur la lutte contre les crimes d'information, quiconque commet une fraude en ligne en utilisant Internet est passible d'une peine d'emprisonnement d'un an minimum et d'une amende d'au moins 50 000 livres égyptiennes et ne dépassant pas 100 000 livres égyptiennes, ou l'une de ces peines. Dans les cas graves, la peine peut atteindre l'emprisonnement ferme.",
    },
    {
      question:
        "Comment récupérer les cadeaux de fiançailles après une rupture?",
      answer:
        "Les cadeaux de fiançailles sont considérés comme faisant partie de la dot selon la loi égyptienne, et le fiancé peut les récupérer après la rupture. Une action en justice doit être intentée pour les réclamer, et le fiancé doit prouver que les fiançailles ont été rompues pour des raisons échappant à son contrôle. Le tribunal fonde son jugement sur les usages et coutumes en la matière.",
    },
    {
      question: "Quelles sont les étapes pour faire appel d'un jugement?",
      answer:
        "Pour faire appel d'un jugement, une requête doit être présentée au tribunal compétent dans les 40 jours suivant la date du jugement. L'appel doit inclure des justifications légales claires, telles qu'une erreur d'application de la loi ou un vice de procédure. Après la soumission de l'appel, une audience sera fixée devant la cour d'appel, qui peut confirmer, modifier ou annuler le jugement initial.",
    },
    {
      question:
        "Comment authentifier un contrat de location dans le registre immobilier?",
      answer:
        "Pour authentifier un contrat de location, le contrat original doit être soumis avec les cartes d'identité des parties et les frais légaux requis. Le contrat sera alors authentifié et enregistré officiellement, garantissant les droits des deux parties devant la loi et permettant l'exécution des termes du contrat par des voies légales en cas de violation.",
    },
    {
      question:
        "Quelles sont les exigences légales pour établir une entreprise en Égypte?",
      answer:
        "Pour établir une entreprise, un contrat de constitution de société notarié doit être soumis au registre immobilier, accompagné d'un registre commercial de la chambre de commerce et d'une carte fiscale. Le type de société (société par actions, société en nom collectif, société à responsabilité limitée) doit être précisé, et il est requis de déposer le capital dans une banque et d'obtenir les approbations des autorités compétentes, comme l'Autorité générale des investissements. L'autorité publie régulièrement des lois pour alléger les procédures pour les investisseurs en Égypte.",
    },
    {
      question: "Comment intenter une action en paternité?",
      answer:
        "Une action en paternité doit être déposée devant le tribunal de la famille avec des preuves de naissance ou tout document prouvant la relation parentale, tels que des rapports de tests ADN. Le tribunal s'appuie sur les preuves et les témoignages présentés, et si la paternité est établie, un jugement judiciaire sera rendu obligeant l'autre partie à reconnaître la paternité et les droits qui y sont liés.",
    },
    {
      question:
        "Quels sont les droits du travailleur à la fin d'un contrat de travail?",
      answer:
        "À la fin d'un contrat de travail, les travailleurs ont plusieurs droits, y compris le droit à une indemnité de fin de service s'ils ont travaillé plus de cinq ans, ainsi que des congés accumulés. Les travailleurs ont également le droit à une indemnité en cas de licenciement abusif, et ils ont droit à un certificat d'expérience et au règlement de toutes les créances financières.",
    },
    {
      question:
        "Quelles sont les sanctions pour diffamation et calomnie dans la loi égyptienne?",
      answer:
        "La diffamation et la calomnie sont punies d'un an d'emprisonnement au maximum et d'une amende variant de 5 000 à 20 000 livres égyptiennes, ou l'une de ces peines. Si la diffamation ou la calomnie se produit par les médias ou Internet, la peine peut être plus sévère en raison de l'ampleur plus grande du crime et des dommages qu'il cause à la personne lésée.",
    },
  ],
};
