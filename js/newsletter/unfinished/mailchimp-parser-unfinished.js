
  //////////////////////////////////////////////
  //////////////////////////////////////////////
  //////////////////////////////////////////////
  //////////////////////////////////////////////
  //////////////////////////////////////////////
  ////                                     /////
  ////                                     /////
  ////    MAILCHIMP CONDITIONALS PARSER    /////
  ////                                     /////
  ////                                     /////
  //////////////////////////////////////////////
  //////////////////////////////////////////////
  //////////////////////////////////////////////
  //////////////////////////////////////////////

  // Conditionals Reference
  // http://kb.mailchimp.com/merge-tags/use-conditional-merge-tag-blocks

  // Only parse the conditionals if we see that they are in the plain text HTML
  if ( conditionsParser && cleanedDesktopHtml.match(/\*\|IF:/gi) && cleanedDesktopHtml.match(/\*\|END:IF\|\*/gi)  ) {

      // Remove all linebreaks/newlines from HTML plain text so that we can REGEX more easily.
      cleanedDesktopHtml = cleanedDesktopHtml.trim();
      cleanedDesktopHtml = cleanedDesktopHtml.replace(/(\r\n|\n|\r)/gm,"");

      // Count the total ifs so that we can mark our <condition> tag.
      var totalConditions = 0;

      ////////////////////
      ////////////////////
      ////     IF    /////
      ////////////////////
      ////////////////////
      matchIfs();
      function matchIfs() {

        totalConditions++;

        var ifMatch = cleanedDesktopHtml.match(/\*\|IF:.+?\|\*.+?\*\|/i);
        // ifMatch = ifMatch[0].replace(/\*\|$/, "");
        // console.log(ifMatch);
        // var ifMatch = ifMatch[0].replace(/p=/gi,"");

        // cleanedDesktopHtml = cleanedDesktopHtml.replace(ifMatch, "<if>" + ifMatch[0] + "</if>" );

        var conditionType = getConditionText(ifMatch[0]);

        var modifiedMatch = ifMatch[0].replace(/\*\|$/, "");
        var ifData = ifMatch[0].match(/^\*\|.+?\|\*/);
        modifiedMatch = modifiedMatch.replace(ifData[0], "");

        ifData = ifData[0].replace(/\*\|IF:/gi, "");
        ifData = ifData.replace(/\|\*/gi, "");

        var ifTag = "<if data-step='if' data-type='merge' data-conditions='" + conditionType + "'>"

        cleanedDesktopHtml = cleanedDesktopHtml.replace(ifMatch[0], "<condition data-step='condition' data-condition-count='" + totalConditions + "'>" + ifTag + modifiedMatch + "</if>*|");

        if ( cleanedDesktopHtml.match(/\*\|IF:.+?\|\*.+?\*\|/i) ) {
          console.log("true");
          matchIfs();
        } else {
          console.log("false");
        }
      }


      ////////////////////
      ////////////////////
      ///   END IF   /////
      ////////////////////
      ////////////////////
      // Close <condition> tags
      cleanedDesktopHtml = cleanedDesktopHtml.replace(/\*\|END:IF\|\*/gi, "</condition>");


      ////////////////////
      ////////////////////
      ////  ELSE IF  /////
      ////////////////////
      ////////////////////
      matchElseIfs();
      function matchElseIfs() {

        // Look for instances of *|ELSEIF in the string.
        var ifMatch = cleanedDesktopHtml.match(/\*\|ELSEIF:.+?\|\*.+?(<\/condition>|\*\|ELSE)/i);

        // elseifs aren't required in a condition. If the .match above did not find any, skip this section
        if ( ifMatch !== null ) {

            var conditionType = getConditionText(ifMatch[0]);

            if ( ifMatch[0].endsWith("</condition>") ) {

              var modifiedMatch = ifMatch[0].replace(/^\*\|ELSEIF:/, "");

              var elseifTag = "<elseif data-step='elseif' data-conditions='" + conditionType + "'>";

              var cleanedMatch = modifiedMatch.replace(/.+\|\*/, "");

              cleanedDesktopHtml = cleanedDesktopHtml.replace(ifMatch[0], elseifTag + cleanedMatch + "</elseif>");

            } else {

              var modifiedMatch = ifMatch[0].replace(/^\*\|ELSEIF:/, "");

              var elseifTag = "<elseif data-step='elseif' data-conditions='" + conditionType + "'>";

              var cleanedMatch = modifiedMatch.replace(/.+\|\*/, "");
                  cleanedMatch = cleanedMatch.replace(/\*\|ELSE/, "");

              cleanedDesktopHtml = cleanedDesktopHtml.replace(ifMatch[0], elseifTag + cleanedMatch + "</elseif>*|ELSE");

            }

            if ( cleanedDesktopHtml.match(/\*\|ELSEIF:.+?\|\*.+?(<\/condition>|\*\|ELSE)/i) ) {
              matchElseIfs();
            }

        }
      }

      ////////////////////
      ////////////////////
      ////    ELSE   /////
      ////////////////////
      ////////////////////
      matchElse();
      function matchElse() {
        var ifMatch = cleanedDesktopHtml.match(/\*\|ELSE:\|\*.+?<\/condition>/i);

        var modifiedMatch = ifMatch[0].replace(/^\*\|ELSE:\|\*/, "");

        var cleanedMatch = modifiedMatch.replace(/<\/condition>/, "");

        cleanedDesktopHtml = cleanedDesktopHtml.replace(ifMatch[0], "<else data-step='else'>" + cleanedMatch + "</else></condition>");


        if ( cleanedDesktopHtml.match(/\*\|ELSE:\|\*.+?<\/condition>/i) ) {
          matchElse();
        }
      }

      /////////////////
      /////////////////
      /////////////////
      function getConditionText(string) {

        var conditionText = string.replace(/^\*\|.+?:/, "");
            conditionText = conditionText.replace(/\|\*.+/, "");

        return conditionText;
      }

      console.log(cleanedDesktopHtml);


  } //// End of MailChimp Conditionals Parser
  //////
  //////
