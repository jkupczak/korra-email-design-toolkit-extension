const defaultLocalSettings = {
  'protectedarticles': "",
  'platform': navigator.platform
};

const defaultSyncSettings = {

  'testOption': '1',

  // Sync Saved
  'defaultSyncOptionsLoaded': 'true',

  // General
  'watchedExtensions': '.html, .htm',
  'watchedFolders': '',

  // Views
  'synchronizeScrolling': '1',
  'customColorScheme': 'light', // options: '', 'light', 'dark'
  'mobileViewVisibility': '1',
  'mobileWidthDefault': '320',
  'mobileWidth': '320, 360, 375, 414, 480',

  // Sharing
  'autoRedirectDropboxLinkstoLocal': '0',

  // Sending Tests

  // App Integrations

  // Variables

  // Link Validation

      // General
      'autoCheckLinks': '1',
      'checkTargetAttribute': '1',
      'checkNoFollowLinks': '1',

      // URL Format Validation
      'checkMissingHrefAttr': '1',
      'checkEmptyLink': '1',
      'checkTrailingHash': '1',
      'checkTrailingSlash': '0',
      'ignoreESPTags': '1',
      'mismatchedHostname': '1',

      // Loading Validation
      'cacheValidLinks': '1',
      'parseDOM': '1',
      'clearCacheAfterXDays': '1',

  // Code Validation

  // ESP Options

      // ESP Merge Tags
      'espMergeTags':
        [
          {
            'n': 'ActiveCampaign',
            'o': '%',
            'c': '%'
          },
          {
            'n': 'Pardot',
            'o': '{{',
            'c': '}}'
          },
          {
            'n': 'Mailchimp',
            'o': '*|',
            'c': '|*'
          },
          {
            'n': 'ON24',
            'o': '#',
            'c': '#'
          },
          {
            'n': 'GetResponse',
            'o': '[[',
            'c': ']]'
          },
          {
            'n': 'SendGrid',
            'o': '{{',
            'c': '}}'
          }
        ],

  // Images

  // Text and Grammer

  // Accessibility

  // Other Tools

  // Alerts

  // install status
  'newInstalled': true
};
