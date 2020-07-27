
//////////////////
//////////////////
var highlightTextErrors = function (stage) {

  console.log(stage);

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
    find: /evidence(\-| )based EBP/gi
  });


  //
  // Time
  //
  // Never EST or EDT, always ET.
  findText({
    find: /\bE(S|D)T\b/gi
  });
  findText({
    find: /\bP(S|D)T\b/gi
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

  // Check for words that would typically be linked by stupid Gmail. Like "tomorrow" linking to the calendar.
  findText({
    find: /\b(Krafft (&|and) Diana|Krafft (&|and) Kornetti)\b/gi,
  });


};
