export interface ITitles {
  ar: string;
  en: string;
  fr: string;
}

export interface BlogData {
  id: number;
  image: string;
  titles: ITitles;
  content: {
    ar: string[];
    en: string[];
    fr: string[];
  };
  largeContent: {
    ar: string[];
    en: string[];
    fr: string[];
  };
  link: string;
}

export const blogsData: BlogData[] = [
  {
    id: 1,
    image: "/imgs/blog_1.webp",
    titles: {
      ar: "دعوى نفقة الصغار",
      en: "Child Support Lawsuit",
      fr: "Action en Pension Alimentaire pour Enfants",
    },
    content: {
      ar: [
        "هل تعرف أن نفقة الأطفال بعد الطلاق هي حق أساسي يكفله القانون المصري؟",
        "في هذا المقال، نوضح لك كل ما تحتاج معرفته عن دعوى نفقة الصغار وأنواع النفقات التي يجب على الأب توفيرها.",
        "اكتشف التفاصيل القانونية الهامة لحماية حقوق أطفالك وضمان مستقبلهم!",
      ],
      en: [
        "Did you know that child support after divorce is a fundamental right protected by Egyptian law?",
        "In this article, we explain everything you need to know about child support lawsuits and the types of support fathers are required to provide.",
        "Discover important legal details to secure your children's rights and their future!",
      ],
      fr: [
        "Saviez-vous que la pension alimentaire pour enfants après un divorce est un droit fondamental protégé par la loi égyptienne ?",
        "Dans cet article, nous vous expliquons tout ce que vous devez savoir sur les actions en pension alimentaire et les types de soutien que les pères doivent fournir.",
        "Découvrez les détails juridiques importants pour protéger les droits de vos enfants et assurer leur avenir !",
      ],
    },
    largeContent: {
      ar: [
        "دعوى نفقة الصغار هي دعوى قضائية ترفعها الأم (أو من ينوب عن الصغار) في مواجهة الأب للمطالبة بنفقة الأطفال القُصر بعد الطلاق أو الانفصال. في القانون المصري، تُعتبر نفقة الصغار من حقوق الأطفال الأساسية التي يجب على الأب توفيرها لتلبية احتياجاتهم الأساسية مثل الطعام، والملبس، والتعليم، والرعاية الصحية.",
        "إن نفقة الصغار تتكون من عدة أنواع رئيسية تتعلق بمختلف احتياجات الأطفال، والتي تتضمن:",
        "1. **نفقة المأكل**: وتشمل توفير الغذاء اللازم للأطفال، حيث يُتوقع من الأب تقديم الطعام الذي يتناسب مع أعمارهم واحتياجاتهم الغذائية.",
        "2. **نفقة الملبس**: تشمل تكاليف الملابس اللازمة للأطفال، والتي تشمل ملابس مناسبة لكل موسم ومناسبة لأعمارهم.",
        "3. **نفقة التعليم**: تشمل مصاريف التعليم مثل الرسوم الدراسية، الكتب، والأدوات المدرسية. من المهم أن يحصل الأطفال على تعليم جيد لضمان مستقبلهم.",
        "4. **نفقة العلاج**: تشمل تكاليف العلاج والرعاية الصحية اللازمة للأطفال. يجب على الأب توفير الرعاية الصحية الأساسية لأطفاله.",
        "5. **نفقة المسكن**: تشمل توفير سكن ملائم للأطفال. يجب أن يكون لديهم مكان آمن ومناسب للعيش.",
        "تُعتبر نفقة الصغار مسؤولية قانونية وأخلاقية تقع على عاتق الأب، وعليه الالتزام بتقديم هذه النفقات لضمان حقوق الأطفال ومساعدتهم على النمو بشكل سليم. في حال عدم تقديم النفقة، يمكن للأم اتخاذ الإجراءات القانونية اللازمة للحصول على حقوق الأطفال.",
      ],
      en: [
        "A child support lawsuit is a legal action initiated by the mother (or a representative for the children) against the father to claim child support for minor children after divorce or separation. In Egyptian law, child support is considered a fundamental right of children that must be provided by the father to meet their basic needs such as food, clothing, education, and healthcare.",
        "Child support consists of several main types related to various needs of children, which include:",
        "1. **Food Support**: This includes providing the necessary food for the children, as the father is expected to provide meals that are appropriate for their ages and nutritional needs.",
        "2. **Clothing Support**: This covers the costs of necessary clothing for the children, which includes suitable clothes for each season and age group.",
        "3. **Education Support**: This includes educational expenses such as tuition fees, books, and school supplies. It is essential for children to receive a good education to ensure their future.",
        "4. **Healthcare Support**: This involves costs for necessary medical care and healthcare for the children. The father must provide basic healthcare for his children.",
        "5. **Housing Support**: This includes providing adequate housing for the children. They should have a safe and suitable place to live.",
        "Child support is a legal and moral responsibility that falls on the father, and he must adhere to providing these supports to ensure the rights of the children and help them grow up properly. If the support is not provided, the mother can take legal action to obtain the children's rights.",
      ],
      fr: [
        "Une action en pension alimentaire pour enfants est une procédure légale engagée par la mère (ou un représentant des enfants) contre le père pour réclamer une pension alimentaire pour des enfants mineurs après un divorce ou une séparation. En droit égyptien, la pension alimentaire pour enfants est considérée comme un droit fondamental des enfants que le père doit fournir pour répondre à leurs besoins fondamentaux tels que la nourriture, les vêtements, l'éducation et les soins de santé.",
        "La pension alimentaire pour enfants se compose de plusieurs types principaux liés aux différents besoins des enfants, qui incluent :",
        "1. **Pension alimentaire pour la nourriture** : Cela comprend la fourniture de la nourriture nécessaire aux enfants, car le père doit fournir des repas adaptés à leur âge et à leurs besoins nutritionnels.",
        "2. **Pension alimentaire pour les vêtements** : Cela couvre les coûts des vêtements nécessaires pour les enfants, ce qui comprend des vêtements appropriés pour chaque saison et groupe d'âge.",
        "3. **Pension alimentaire pour l'éducation** : Cela inclut les dépenses éducatives telles que les frais de scolarité, les livres et les fournitures scolaires. Il est essentiel que les enfants reçoivent une bonne éducation pour garantir leur avenir.",
        "4. **Pension alimentaire pour les soins de santé** : Cela implique les coûts des soins médicaux nécessaires et des soins de santé pour les enfants. Le père doit fournir des soins de santé de base à ses enfants.",
        "5. **Pension alimentaire pour le logement** : Cela comprend la fourniture d'un logement adéquat pour les enfants. Ils doivent avoir un endroit sûr et approprié pour vivre.",
        "La pension alimentaire est une responsabilité légale et morale qui incombe au père, et il doit s'engager à fournir ces soutiens pour garantir les droits des enfants et les aider à grandir correctement. Si la pension n'est pas fournie, la mère peut engager des poursuites judiciaires pour obtenir les droits des enfants.",
      ],
    },
    link: "/blog/1",
  },
  {
    id: 2,
    image: "/imgs/blog_2.webp",
    titles: {
      ar: "عقد العمل في القانون المصري",
      en: "Employment Contract in Egyptian Law",
      fr: "Contrat de Travail dans le Droit Égyptien",
    },
    content: {
      ar: [
        "هل تعلم أن عقد العمل هو الأساس الذي ينظم العلاقة بين العامل وصاحب العمل؟",
        "اكتشف في هذا المقال أهم العناصر التي يجب أن يتضمنها عقد العمل في مصر، مثل الأجر، المدة الزمنية، والشروط العامة.",
        "اقرأ المزيد لتعرف كيف تحمي حقوقك وتضمن الالتزام بأحكام القانون في تعاقدات العمل!",
      ],
      en: [
        "Did you know that the employment contract is the cornerstone of the relationship between employees and employers?",
        "In this article, we explore the key components of an employment contract in Egypt, such as wages, duration, and general terms.",
        "Read more to find out how to protect your rights and ensure legal compliance in your employment agreements!",
      ],
      fr: [
        "Saviez-vous que le contrat de travail est la pierre angulaire de la relation entre l'employé et l'employeur ?",
        "Dans cet article, nous explorons les éléments clés d'un contrat de travail en Égypte, tels que le salaire, la durée, et les conditions générales.",
        "Lisez la suite pour découvrir comment protéger vos droits et garantir la conformité juridique de vos accords de travail !",
      ],
    },
    largeContent: {
      ar: [
        "يُعرف عقد العمل كاتفاق يتم بين صاحب العمل والعامل، حيث يتعهد العامل بتنفيذ العمل المتفق عليه مقابل أجر محدد، سواء كان ذلك بشكل مؤقت أو دائم، وفقًا لأحكام القانون والاتفاقيات المتفق عليها بين الطرفين.",
        "عقد العمل هو الأساس الذي ينظم العلاقة بين العامل وصاحب العمل، ويجب أن يتضمن عدة عناصر أساسية تضمن حقوق كل من الطرفين، وتساعد في تجنب أي نزاعات مستقبلية.",
        "أهم عناصر عقد العمل في القانون المصري تشمل:",
        "1. **الطرفين**: يتكون عقد العمل من صاحب العمل الذي يقدم العمل ويدفع الأجر، والعامل الذي يقدم خدمات العمل بمقابل. يجب تحديد هويتهما بدقة في العقد.",
        "2. **الأجر**: يتم تحديد مبلغ الأجر المتفق عليه بين الطرفين، سواء بمبلغ محدد أو بنسبة مئوية من الإيرادات أو بأي شكل آخر متفق عليه. يجب توضيح كيفية دفع الأجر (شهريًا، أسبوعيًا، إلخ).",
        "3. **الوقت والمدة**: يُحدد عقد العمل مدة معينة لتنفيذ العمل، سواء كان ذلك لفترة محددة أو غير محددة، ويُحدد أيضًا الجدول الزمني وساعات العمل. يجب توضيح أي فترات تجريبية أيضًا.",
        "4. **شروط العمل**: تشمل شروط العمل المهام والمسؤوليات التي يجب أن يقوم بها العامل، والحقوق والواجبات التي يجب أن يلتزم بها الطرفان. يجب تحديد المعايير المطلوبة لأداء العمل.",
        "5. **الإنهاء والفسخ**: تحدد شروط إنهاء العقد والفسخ بموجب القانون، مثل الإنهاء بناءً على انتهاء المدة المحددة أو بموجب اتفاق الطرفين أو لأسباب محددة مثل تقديم الطرفين لإشعار مسبق. يجب أن تكون هذه الشروط واضحة لتجنب أي نزاعات.",
        "عقد العمل يعتبر وثيقة قانونية مهمة تنظم العلاقة بين صاحب العمل والعامل، وتضمن حقوق كل طرف وواجباته. يتم إعداد عقد العمل بموجب قوانين العمل المصرية ويجب أن يتم تنفيذه وفقًا لأحكام القانون والقواعد العامة للعقود.",
        "بالتالي، يُنصح جميع العاملين وأصحاب العمل بالتأكد من فهمهم الكامل لبنود عقد العمل وتوثيقه بشكل صحيح لحماية حقوقهم القانونية وضمان التعاون المثمر بين الطرفين.",
      ],
      en: [
        "An employment contract is defined as an agreement made between the employer and the employee, where the employee commits to perform the agreed-upon work in exchange for a specified wage, whether temporarily or permanently, according to the provisions of the law and the agreements made between the parties.",
        "The employment contract is the cornerstone of the relationship between employees and employers, and it must include several essential elements that guarantee the rights of both parties and help avoid any future disputes.",
        "Key components of an employment contract in Egyptian law include:",
        "1. **The Parties**: The employment contract consists of the employer who provides the work and pays the wage, and the employee who provides labor services in exchange. Their identities should be clearly defined in the contract.",
        "2. **Wages**: The agreed-upon wage amount is specified between the two parties, whether as a fixed amount or a percentage of revenues or in any other mutually agreed form. The method of payment (monthly, weekly, etc.) should also be clarified.",
        "3. **Time and Duration**: The employment contract specifies a certain duration for performing the work, whether for a fixed or indefinite period, and also defines the schedule and working hours. Any probation periods should also be specified.",
        "4. **Work Conditions**: Work conditions include the tasks and responsibilities that the employee must perform, as well as the rights and obligations that both parties must adhere to. The required performance standards should be defined.",
        "5. **Termination and Rescission**: The conditions for terminating the contract and rescission under the law are defined, such as termination based on the expiration of the specified duration or by mutual agreement or for specific reasons, such as providing notice by both parties. These conditions should be clear to avoid disputes.",
        "The employment contract is an important legal document that regulates the relationship between the employer and the employee and guarantees the rights and obligations of each party. Employment contracts are prepared under Egyptian labor laws and must be executed according to the provisions of the law and the general rules of contracts.",
        "Therefore, it is advisable for all employees and employers to ensure their full understanding of the terms of the employment contract and to document it properly to protect their legal rights and ensure fruitful cooperation between the two parties.",
      ],
      fr: [
        "Un contrat de travail est défini comme un accord établi entre l'employeur et l'employé, où l'employé s'engage à exécuter le travail convenu en échange d'un salaire spécifié, que ce soit de manière temporaire ou permanente, conformément aux dispositions de la loi et aux accords convenus entre les parties.",
        "Le contrat de travail est la pierre angulaire de la relation entre les employés et les employeurs, et il doit inclure plusieurs éléments essentiels qui garantissent les droits des deux parties et aident à éviter tout litige futur.",
        "Les éléments clés d'un contrat de travail en droit égyptien incluent :",
        "1. **Les Parties** : Le contrat de travail se compose de l'employeur qui fournit le travail et paie le salaire, et de l'employé qui fournit des services de travail en contrepartie. Leur identité doit être clairement définie dans le contrat.",
        "2. **Le Salaire** : Le montant du salaire convenu est spécifié entre les deux parties, que ce soit sous forme d'un montant fixe ou d'un pourcentage des revenus, ou sous toute autre forme convenue. La méthode de paiement (mensuelle, hebdomadaire, etc.) doit également être clarifiée.",
        "3. **Temps et Durée** : Le contrat de travail précise une certaine durée pour l'exécution du travail, que ce soit pour une période fixe ou indéterminée, et définit également le calendrier et les heures de travail. Toute période d'essai doit également être spécifiée.",
        "4. **Conditions de Travail** : Les conditions de travail incluent les tâches et responsabilités que l'employé doit accomplir, ainsi que les droits et obligations auxquels les deux parties doivent se conformer. Les normes de performance requises doivent être définies.",
        "5. **Résiliation et Annulation** : Les conditions de résiliation du contrat et d'annulation en vertu de la loi sont définies, telles que la résiliation en fonction de l'expiration de la durée spécifiée ou d'un commun accord, ou pour des raisons spécifiques, telles que la notification par les deux parties. Ces conditions doivent être claires pour éviter des litiges.",
        "Le contrat de travail est un document juridique important qui régule la relation entre l'employeur et l'employé et garantit les droits et obligations de chaque partie. Les contrats de travail sont préparés conformément aux lois du travail égyptiennes et doivent être exécutés conformément aux dispositions de la loi et aux règles générales des contrats.",
        "Par conséquent, il est conseillé à tous les employés et employeurs de s'assurer qu'ils comprennent pleinement les termes du contrat de travail et de le documenter correctement afin de protéger leurs droits légaux et d'assurer une coopération fructueuse entre les deux parties.",
      ],
    },
    link: "/blog/2",
  },
  {
    id: 3,
    image: "/imgs/blog_3.webp",
    titles: {
      ar: "حرية القتل الإلكتروني",
      en: "Freedom of Cyber Killing",
      fr: "Liberté du Meurtre Électronique",
    },
    content: {
      ar: [
        'رغم عدم وجود مصطلح رسمي لـ "جريمة القتل الإلكتروني"، يمكن استخدامه لوصف حالات نادرة تسبب فيها التحريض أو التكنولوجيا الرقمية الوفاة.',
        "أمثلة تشمل التحريض على الانتحار عبر الإنترنت أو التلاعب بالأجهزة الطبية رقمياً.",
        "تعرف على المزيد حول هذه التحديات القانونية النادرة في العصر الرقمي.",
      ],
      en: [
        'Though there is no official term for "cyber killing," it can describe rare cases where online incitement or digital technology causes death.',
        "Examples include inciting suicide online or manipulating medical devices digitally.",
        "Learn more about these rare legal challenges in the digital age.",
      ],
      fr: [
        "Bien qu'il n'existe pas de terme officiel pour \"meurtre électronique\", il peut décrire des cas rares où l'incitation en ligne ou la technologie numérique cause la mort.",
        "Des exemples incluent l'incitation au suicide en ligne ou la manipulation numérique des dispositifs médicaux.",
        "Découvrez ces défis juridiques rares à l'ère numérique.",
      ],
    },
    largeContent: {
      ar: [
        'لا يوجد مصطلح رسمي يُطلق عليه "جريمة القتل الإلكتروني" في القوانين الجنائية العامة. ومع ذلك، يمكن استخدام هذا المصطلح لوصف حالات نادرة قد تحدث عندما يؤدي تحريض عبر الإنترنت أو استخدام التكنولوجيا الرقمية إلى وفاة شخص ما.',
        'من الأمثلة على سيناريوهات محتملة تشمل جريمة "القتل الإلكتروني":',
        '1. **تحريض على الانتحار عبر الإنترنت**: على سبيل المثال، إذا قام شخص بتحريض آخر على الانتحار من خلال منصات التواصل الاجتماعي أو المنتديات عبر الإنترنت، وقد أدى هذا التحريض في النهاية إلى وفاة الشخص المتضرر، يمكن اعتبارها جريمة "القتل الإلكتروني".',
        "2. **استخدام التكنولوجيا للقتل**: في بعض الحالات النادرة، يمكن أن يستخدم القاتل التكنولوجيا الرقمية بشكل مباشر للقتل، مثل استغلال ثغرات الأمان في أجهزة طبية متصلة بالإنترنت للتلاعب بها وتسبب في إصابة أو وفاة الضحية.",
        "3. **القتل عبر الإنترنت بواسطة الإجراءات الأمنية**: يمكن أن تنجم الهجمات السيبرانية عن أضرار جسيمة، بما في ذلك الإصابات أو الوفيات، عندما تتأثر بنية تحكم الأجهزة الطبية أو البنية التحتية الحيوية للمؤسسات الحيوية.",
        "هذه الحالات تُعتبر نادرة وتعتبر أكثر تعقيدًا من القتل العادي، ولكنها تظهر أهمية تطوير قوانين وسياسات تعامل مع التحديات الجديدة التي يطرحها التقدم التكنولوجي واستخدام التكنولوجيا في ارتكاب الجرائم.",
      ],
      en: [
        "There is no official term called 'cyber killing' in general criminal law. However, this term can be used to describe rare cases that may occur when online incitement or the use of digital technology leads to someone's death.",
        "Examples of potential scenarios include 'cyber killing':",
        "1. **Inciting suicide online**: For example, if someone incites another person to commit suicide through social media platforms or online forums, and this incitement ultimately leads to the death of the affected person, it can be considered 'cyber killing'.",
        "2. **Using technology for murder**: In some rare cases, a killer may directly use digital technology for murder, such as exploiting security vulnerabilities in internet-connected medical devices to manipulate them and cause injury or death to the victim.",
        "3. **Killing via online security measures**: Cyber attacks can result in severe damage, including injuries or fatalities, when they affect the control infrastructure of medical devices or the critical infrastructure of vital institutions.",
        "These cases are considered rare and are more complex than ordinary murder, but they highlight the importance of developing laws and policies to address the new challenges posed by technological advancement and the use of technology in committing crimes.",
      ],
      fr: [
        "Il n'existe pas de terme officiel appelé \"meurtre électronique\" dans le droit pénal général. Cependant, ce terme peut être utilisé pour décrire des cas rares qui peuvent survenir lorsque l'incitation en ligne ou l'utilisation de la technologie numérique entraîne la mort d'une personne.",
        'Des exemples de scénarios potentiels incluent le "meurtre électronique":',
        '1. **Incitation au suicide en ligne**: Par exemple, si quelqu\'un incite une autre personne à se suicider par le biais de plateformes de médias sociaux ou de forums en ligne, et que cette incitation conduit finalement à la mort de la personne concernée, cela peut être considéré comme un "meurtre électronique".',
        "2. **Utilisation de la technologie pour tuer**: Dans certains cas rares, un meurtrier peut utiliser directement la technologie numérique pour tuer, comme exploiter des vulnérabilités de sécurité dans des dispositifs médicaux connectés à Internet pour les manipuler et provoquer des blessures ou la mort de la victime.",
        "3. **Meurtre par le biais de mesures de sécurité en ligne**: Les cyberattaques peuvent entraîner des dommages considérables, y compris des blessures ou des décès, lorsqu'elles affectent l'infrastructure de contrôle des dispositifs médicaux ou l'infrastructure critique des institutions vitales.",
        "Ces cas sont considérés comme rares et sont plus complexes que le meurtre ordinaire, mais ils soulignent l'importance de développer des lois et des politiques pour traiter les nouveaux défis posés par les avancées technologiques et l'utilisation de la technologie dans la commission de crimes.",
      ],
    },
    link: "/blog/3",
  },
];
