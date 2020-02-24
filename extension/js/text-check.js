
//////////////////
//////////////////
var highlightTextErrors = function (stage) {

  ////////////////////
  ////////////////////
  var findText = function(data) {
    var wrapClass = "text-highlight " + data.wrapClass;

    findAndReplaceDOMText(stage, {
      preset: 'prose',
      find: data.find,
      wrap: 'span',
      wrapClass: wrapClass
    });
  };

  // This function allows findAndReplaceDOMText to exclude matches. This functionality is not built-in to the script so we need this function.
  // Visit this closed issue on GitHub for more info: https://github.com/padolsey/findAndReplaceDOMText/issues/64
  var globalRegexWithFilter = function (regex, filterFn) {
    if (!regex.global) {
      throw new Error('Regex must be global');
    }
    function exec(text) {
      var result = regex.exec(text);
      if (result && !filterFn(result[0])) {
        return exec(text);
      }
      return result;
    }
    return {
      global: true,
      exec: exec
    };
  };

  //
  // SPAM TRIGGER WORD
  //

  findText({find: /\b((‘|')?Hidden(’|')? assets|100% free|100% Satisfied|4U|\$\$\$|\bAd\b|Accept credit cards|Acceptance|Act Now!?|Act now!? Don(’|')?t hesitate\!?|Additional income|Addresses on CD|All natural|All new|Amazing stuff|Apply now|Apply Online|As seen on|Auto email removal|Avoid bankruptcy|Bargain|Be amazed|Be your own boss|Beneficiary|Beverage|Big bucks|Bill 1618|Billing address|Brand new pager|Bulk email|Buy direct|Buying judgements|Buying judgments|Cable converter|Call free|Call now|Calling creditors|Can(’|')?t live without|Cancel at any time|Cannot be combined with any other offer|Cards accepted|Cash bonus|Casino|Celebrity|Cell phone cancer scam|Cents on the dollar|Check or money order|Claims|Claims not to be selling anything|Claims to be in accordance with some spam law|Claims to be legal|Clearance|Collect child support|Compare rates|Compete for your business|Confidentially on all orders|Consolidate debt and credit|Consolidate your debt|Copy accurately|Copy DVDs|Credit bureaus|Credit card offers|Cures baldness|Dig up dirt on friends|Direct email|Direct marketing|Do it today|Don(’|')?t delete|Don(’|')?t hesitate|Double your|Double your income|Drastically reduced|Earn \$|Earn extra cash|Earn per week|Easy terms|Eliminate bad credit|Eliminate debt|Email harvest|Email marketing|Expect to earn|Explode your business|Extra income|F r e e|Fantastic deal|Fast cash|Fast Viagra delivery|Financial freedom|Financially independent|For instant access|For just \$|For just \$[0-9]+?|Free access|Free cell phone|Free consultation|Free consultation|Free DVD|Free gift|Free grant money|Free hosting|Free info|Free installation|Free Instant|Free investment|Free leads|Free membership|Free money|Free offer|Free preview|Free priority mail|Free quote|Free sample|Free trial|Free website|Full refund|Get it now|Get out of debt|Get paid|Gift certificate|Give it away|Giving away|Great offer|Have you been turned down\??|Hidden assets|Hidden charges|Home based|Home employment|Homebased business|Human growth hormone|If only it were that easy|Important information regarding|In accordance with laws|Income from home|Increase sales|Increase traffic|Increase your sales|Incredible deal|Info you requested|Information you requested|Insurance|Internet market|Internet marketing|Investment decision|It(’|')?s effective|It(’|')?s effective|Join millions|Join millions of Americans|Laser printer|Life Insurance|Loans|Long distance phone offer|Lose weight|Lose weight spam|Lower interest rate|Lower interest rates|Lower monthly payment|Lower your mortgage rate|Lowest insurance rates|Luxury car|Mail in order form|Make \$|Make money|Marketing solutions|Mass email|Meet singles|Member stuff|Message contains|Message contains disclaimer|Miracle|MLM|Money back|Money making|Month trial offer|More Internet Traffic|Mortgage|Mortgage rates|Multi\-?level marketing|New customers only|New domain extensions|Nigerian|No age restrictions|No catch|No claim forms|No cost|No credit check|No disappointment|No experience|No fees|No gimmick|No hidden|No inventory|No investment|No medical exams|No questions asked|No selling|No strings attached|Not intended|Notspam|Now only|Off shore|Offer expires|Once in lifetime|One hundred percent free|One hundred percent guaranteed|One time|One time mailing|Online biz opportunity|Online degree|Online marketing|Online pharmacy|Opt in|Order now|Order shipped by|Order status|Order today|Orders shipped by|Outstanding values|Pennies a day|Potential earnings|Pre-approved|Print form signature|Print out and fax|Priority mail|Produced and sent out|Promise you|Pure Profits|Real thing|Refinance home|Refinanced home|Removal instructions|Removes wrinkles|Reserves the right|Reverses aging|Risk free|S 1618|Safeguard notice|Satisfaction guaranteed|Save \$|Save big money|Save up to|Score with babes|Search engine listings|Search engines|Section 301|See for yourself|Sent in compliance|Serious cash|Serious only|Shopping spree|Sign up free today|Social security number|Stainless steel|Stock alert|Stock disclaimer statement|Stock pick|Stop snoring|Strong buy|Stuff on sale|Subject to cash|Subject to credit|Supplies are limited|Take action now|Talks about hidden charges|Talks about prizes|Tells you it(’|')?s an ad|The best rates|The following form|They keep your money \– no refund|They(’|')?re just giving it away|This isn(’|')?t (junk|spam|last|a scam)?|Time limited|Trial|Undisclosed recipient|University diplomas|Unsecured (credit|debt)|Unsolicited|US dollars|Vacation|Vacation offers|Valium|Viagra|Viagra and other drugs|Vicodin|Visit our website|Wants credit card|Warranty|We hate spam|We honor all|Web traffic|Weekend getaway|Weight loss|What are you waiting for\??|While supplies last|While you sleep|Who really wins\??|Why pay more\??|Wife|Will not believe your eyes|Work at home|Work from home|Xanax|You are a winner!?|You have been selected|You(’|')?re a Winner!?|Your income)\b/gi });
  // Click|Click below|Click here|Click to remove|

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////


  ///////////////////////////////////////////
  ////                                   ////
  ////    CONDITIONALS HIGHLIGHTING      ////
  ////                                   ////
  ///////////////////////////////////////////

  if ( email.esp === "mc" ) {
    // Do not use *|MAILCHIMP|* merge tags with a GetResponse email.
    findText({find: /\*\|((IF|END|ELSEIF|INTERESTED):.+?|ELSE:)\|\*/gi, wrapClass: "esp-conditional"});
  }


  /////////////////////////////////
  ////                         ////
  ////    PLATFORM CHECKS      ////
  ////                         ////
  /////////////////////////////////

  if ( email.esp === "gr" ) {
    findText({find: /(\*\|.+?\|\*|\[[^\[\]]+?\][^\]])/gi });
  }

  if ( email.esp === "gr" ) {
    findText({find: /(\*\|.+?\|\*|\[[^\[\]]+?\][^\]])/gi });
  }

  if ( email.esp === "sg" ) {
    findText({find: /(\*\|.+?\|\*|\[\[.+?\]\])/gi });// Do not use *|MAILCHIMP|* merge tags with a GetResponse email.
  }


  /////////////////////////////////
  ////                         ////
  ////    DISCIPLINE CHECKS    ////
  ////                         ////
  /////////////////////////////////

  // Promo Codes
    if ( email.audience !== "pt" ) {
      findText({find: /(Promo Code.+?\b[A-Za-z0-9]+?PT\b)/gi });
    }
    if ( email.audience !== "at" ) {
      findText({find: /(Promo Code.+?\b[A-Za-z0-9]+?AT\b)/gi });
    }
    if ( email.audience !== "ot" ) {
      findText({find: /(Promo Code.+?\b[A-Za-z0-9]+?OT\b)/gi });
    }
    if ( email.audience !== "slp" ) {
      findText({find: /(Promo Code.+?\b[A-Za-z0-9]+?SLP\b)/gi });
    }
    if ( email.audience === "other" ) {
      findText({find: /(Promo Code.+?\b[A-Za-z0-9]+?(PT|AT|OT|SLP)\b)/gi });
    }

  //////////
  ////
  //// Pricing
  ////
  //////////
  if ( email.audience === "pt" || email.audience === "other" || email.audience === "ot" || email.audience === "at" ) {
    findText({find: /((only )?\$95|(only )?\$145)/gi });
  }

  if ( email.audience === "slp" ) {
    findText({find: /((only )?\$200|(only )?\$250)/gi });
  }

  if ( email.audience === "lmt" || email.audience === "ent" ) {
    findText({find: /\$95|\$145|\$200|\$250/gi });
  }

  //////////
  ////
  //// Physical Therapy - PT
  ////
  //////////
  if ( email.audience === "pt" ) {

    // case sensitive
    findText({find: /\b(ASHA|AOTA)\b/g });

    // case (IN)sensitive
    findText({find: /(BOC\-Approved|Athletic Train(er|ing)|Occupational (Courses?|Therap(y|ist)))/gi });

  //////////
  ////
  //// Other
  ////
  //////////

  } else if ( email.audience === "other" ) {

    // case sensitive
    findText({find: /\b(ASHA|AOTA)\b/g });

    // case (IN)sensitive
    findText({find: /(BOC\-Approved|Athletic Train(er|ing)|(Physical|Occupational) (Courses?|Therap(y|ist)))/gi });

  //////////
  ////
  //// Athletic Training - AT
  ////
  //////////

  } else if ( email.audience === "at" ) {

    // case sensitive
    findText({find: /\b(ASHA|AOTA)\b/g });

    // case (IN)sensitive
    findText({find: /((only )?\$95|(only )?\$145|Physical (Courses?|Therap(y|ist))|Occupational (Courses?|Therap(y|ist)))/gi });

  //////////
  ////
  //// Occupational Therapy - OT
  ////
  //////////
  } else if ( email.audience === "ot" ) {

    // case sensitive
    findText({find: /\b(ASHA)\b/g });

    // case (IN)sensitive
    findText({find: /(BOC\-Approved|Physical (Courses?|Therap(y|ist))|Athletic Train(er|ing))/gi });

  //////////
  ////
  //// Speech Language Pathology - SLP
  ////
  //////////
  } else if ( email.audience === "slp" ) {

    findText({find: /\b(AOTA|APTA)\b/g });

    // case-insensitive
    findText({find: /(BOC\-Approved|Physical Therap(y|ist)|Athletic Train(er|ing)|Occupational (Courses?|Therap(y|ist))|patient outcomes?|clinician)/gi });

  //////////
  ////
  //// Nursing - RN
  ////
  //////////
} else if ( email.audience === "rn" ) {

    // case sensitive
    findText({find: /\b(ASHA|AOTA)\b/g });

    // case (IN)sensitive
    findText({find: /(BOC\-Approved|Athletic Train(er|ing)|(Physical|Occupational) (Courses?|Therap(y|ist)))/gi });

  //////////
  ////
  //// Massage
  ////
  //////////
  } else if ( email.audience === "lmt" ) {

    findText({find: /\b(ASHA|AOTA)\b/g });

    // case-insensitive
    findText({find: /(BOC\-Approved|Physical Therap(y|ist)|CCC\-SLP|patient engagement tool)/gi });

  //////////
  ////
  //// Enterprise
  ////
  //////////
  } else if ( email.audience === "ent" ) {
    // Enterprise

  }

  //
  // ALL
  //

  // NOTES ABOUT TEXT WARNINGS ---
  ////////////////////////////////

  // 17-11-06 - Subscribers don't win a free subscription, they win a subscription extension and vice versa for non-subscribers.
  // 17-06-14 - Decided to stop saying "Unlimited CEUs" and instead say "Unlimited Access to CEUs" or "Unlimited CEU Access". We don't literally have unlimited CEUs, but we can provide unlimited ACCESS. Thanks ASHA! -_-
    // - 10/30/17 Update: Per ASHA, "Unlimited Access to CEUs" is still not right. We have to say "Unlimited Access to CE Courses". This only applies to SLP.
  // 17-09-05 - Justin does not like "From the Blog" or even referring to our blog site as a blog at all.
  // 18-04-24 - Never 'Continued' Education. Only 'Continuing' Education.
  // 18-08-28 - ASHA
     // MedBridge is an ASHA Approved Provider and MedBridge offers courses registered for ASHA CEUs. It is incorrect to say that MedBridge offers ASHA-approved or ASHA-accredited courses because we do not approve or accredit content we only approve or accredit providers. Unlimited CEU courses is misleading – there is a limit to what you can offer

  ////////////////////////////////
  ////////////////////////////////

  // All Disciplines and Audiences
  // Case (IN)sensitive


    findText({
      find: /CRRN[^\®]|(continuing education|from the )?blog|Unlimited CEUs(\.|!)|(asha( |\-)(approved|accredited)|at no extra cost|get your ceu|ceu's|\/?[A-Za-z]+>)/gi
    });

    // Long-Term Care, not Long Term Care
    findText({
      find: /(Long Term Care)/gi
    });

    // Continuing Education, not Continued Education
    findText({
      find: /(continued education|speech language)/gi
    });

    // Link Arrows → Arrows need to be immediately preceded by a non-breaking space to ensure it doesn't get dropped to the next line
    findText({
      find: /(?:(?!\u00a0).{1}|^.{0,0})(\u2192)(?!\u00a0)/gi
    });

    // CE Courses, not CEU Courses
    findText({
      find: /\bCEU Course/gi
    });

  // All Disciplines and Audiences
  // Case Sensitive
  ////


    findText({
      find: /\b[Mm]edbridge( |\.|\!|\?|,)/g

        });
    findText({
      find: /\bCross-Track\b/g
    });


//
// NUMBERS - MISSING COMMAS
// Ignore numbers that start with 0, the end of phone numbers (-####), common years (1990-1999, 2001-2040), MedBridge address (1633, 98109)
//

  findText({
  	find: globalRegexWithFilter(/[^-–:#]\b[1-9]\d\d\d\b/g, function(theMatch) {
    	return !/(98109|1633|199[0-9]|20[0-4][0-9])/g.test(theMatch);
    })
  });


  //
  // PRODUCT CAPITALIZATION

      //
  findText({
    find: /MedBridge ((?:patient [Ee]|Patient e)ngagement|Prep\-program|prep\-[Pp]rogram)/g,
  });

  //
  // Prep Program

      //
  findText({
    find: /\b(MedBridge|[A-Z]CS) prep [Pp]rogram\b/g
  });


  findText({
    find: /\bprep\-programs?\b/gi
  });

  //
  // Subscriber
  //
  if
       ( email.subscription === "sub" ) { // Removed && email.audience !== "ent"
    findText({
      find: /(win a free subscription|First Chapter Free|Start for Free|\bSubscribe\b|(?:in the (?:annual )?|in the annual MedBridge )subscription|\bin a(?:n annual|(?:n annual MedBridge)?) subscription|with a(?:n annual|(?:n annual MedBridge)?) subscription)/gi
    });
  }

  //
  // Non-Subscribers
  //
  if
       ( email.subscription === "ns" ) {
    findText({
      find: /(Start Now|Refer(\-| )a(\-| )Friend|in(?:cluded with)? your (?:(?:MedBridge )?s|annual (?:MedBridge )?s)ubscription)/gi
    });
  }

  //
  // email.outsideOrg
  //
  if ( email.outsideOrg ) {


    findText({
      find: /additional cost|Refer(\-| )a(\-| )Friend/gi
    });


    findText({
      find: /Enterprise/g
    });

  }

  //
  // emailAnySale
  //
  if
       ( (email.subscription === "ns" || email.subscription === "sub") && !emailAnySale ) {
    findText({
      find: /(only )?\$(200|95|145|250)( |!|\.)/gi
    });
  }

  //
  // Sale Verbiage
  //

  if ( emailAnySale && email.audience !== "lmt" ) {
    findText({
      find: /50%/gi
    });
  }
  // Massage Pricing
  if ( emailAnySale && email.audience === "lmt" ) {
    findText({
      find: /40%/gi
    });
  }


  //
  // Grammar

      //
  findText({
    find: /evidence based EBP/gi
  });


  findText({
    find: /evidence\-based EBP/gi
  });



  if ( email.outsideOrg ) {
    findText({
      find: /(request a demo|part of an? (group|organization)|sign(\-| )up|\bsubscribe\b)/gi
    });
  }


  if ( email.audience === "slp" ) {
    findText({
      find: /CEU Sale|Unlimited (Access to )?(CE'?s|CEU'?s)/gi
      // Must say CE Course
    });
  }

  // Amelia Ramstead [8:06 AM]
  // 1:00pm EST --> this looks odd with no space between the time and pm. I feel like 1:00 pm works or 1pm works, but not 1:00pm.
  // Also, we have it as p,m. with periods in the body of the text. Let's keep it consistent and remove the periods here.

    // flag 1:00pm and 1pm
    findText({
      find: /\b\d(\:\d\d)?(a|p)m\b/gi
    });
    // flag p.m.
    findText({
      find: /\b(a|p)\.m\.?\b/gi
    });

  // Check for words that would typically be linked by stupid Gmail. Like "tomorrow" linking to the calendar.
  findText({
    find: /\b(tomorrow|noon)\b/gi,
    wrapClass: "text-highlight gmail-fix", forceContext: true
  });

  // No leading 0's after a month
  findText({
    find: /\b(January|February|March|April|May|June|July|August|September|October|November|December) 0/gi,
  });



};
