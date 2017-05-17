# xmonad.hs


```
let ioSocket = io.connect("http://localhost:3000");

let is_reply;

ioSocket.on("connect", function() {
  is_reply = false;
  ioSocket.emit('connect_start');
});

ioSocket.on("disconnect", function() {});

ioSocket.on('before_timeline', function (status_list) {
  for(let tweet_status of status_list){
    prependMessage(tweet_status, $('#messageView'));
  }
});

ioSocket.on("before_mentions", function (mentions) {
  for(let mention of mentions){
    prependMessage(mention, $('#mentionView'));
  }
});

ioSocket.on("mention_come", function (data) {
  prependMessage(data.tweet_status, $('#mentionView'));
});

ioSocket.on("twitter_message", function(data) {
  prependMessage(data.tweet_status, $('#messageView'));
});

function retweet(tweet_id){
  if(window.confirm('Do you RT this tweet?')){
    ioSocket.emit('retweet_request', tweet_id);
  }
  else{
    window.alert('canceled');
  }
}

function favorite(tweet_id){
  ioSocket.emit('favorite_request', tweet_id);
}


function imageView(tweet_status){
  let img_tag = '';
  if('extended_entities' in tweet_status && 'media' in tweet_status.extended_entities){
    for(let media in tweet_status.extended_entities.media) {
      if(media.type === "photo"){
        img_tag += '<a href="'+ media.media_url +
            '"><img src="' + media.media_url + '" class="user-photo"></a>'
      }
      else if(media_list.media[j].type === "video"){
        return '';
      }
    }
    img_tag += '<br>'
  }
  return img_tag;
}

function prependMessage(tweet_status, $tab_id) {
  let id_str;
  let user_name;
  let user_id;
  let text;
  let user_icon ;
  let retweet_sentence;

  if('retweeted_status' in tweet_status){
    id_str = tweet_status.retweeted_status.id_str;
    user_name = tweet_status.retweeted_status.user.name;
    user_id = tweet_status.retweeted_status.user.screen_name;
    text = tweet_status.retweeted_status.text;
    user_icon = tweet_status.retweeted_status.user.profile_image_url;
    retweet_sentence = tweet_status.user.name + ' retweeted';
  }
  else{
    id_str = tweet_status.id_str;
    user_name = tweet_status.user.name;
    user_id = tweet_status.user.screen_name;
    text = tweet_status.text;
    user_icon = tweet_status.user.profile_image_url;
    retweet_sentence = '';
  }

  $tab_id.prepend(
    '<li class="tweet-li list-group-item list-group-item-action" id="'+id_str+'">' +
      '<p>' + retweet_sentence + '</p>'+
      '<div class="user-tweet">' +
        '<section class="column-icon"><img src="' + user_icon + '" ></section>' +
        '<section>' +
          '<strong><span  style="color: white">' + user_name + '</span></strong>' + '@'+ user_id +'<br>' +
          '<p><span style="color: white">' + text + '</span></p>' + imageView(tweet_status) +
        '</section>' +
      '</div>' +
      '<div class="mention-buttons">' +
        '<button class="btn btn-xs btn-primary" onclick="favorite(\'' +
          id_str + '\')"><span class="glyphicon glyphicon-star" aria-hidden="true"></span> Fav</button>' +
        '<button class="btn btn-xs btn-primary" onclick="retweet(\'' +
          id_str + '\')"><span class="gyphicon glyphicon glyphicon glyphicon-retweet" aria-hidden="true"></span> RT</button>' +
        '<button class="btn btn-xs btn-primary" onclick="reply(\'' +
          tweet_status + '\')"><span class="gyphicon glyphicon glyphicon-share-alt" aria-hidden="true"></span> reply</button>' +
      '</div>' +
    '</li>'
  );
}
```


``` haskell
import qualified Data.Map as M
import Control.Monad (liftM2)
import Data.Monoid
import Data.Maybe (maybe)
import System.IO
import System.Posix.Env (getEnv)

import XMonad
import XMonad.Config.Desktop
import XMonad.Config.Gnome
import XMonad.Config.Kde
import XMonad.Config.Xfce
import qualified XMonad.StackSet as W

import XMonad.Actions.CopyWindow
import XMonad.Actions.CycleWS
import qualified XMonad.Actions.FlexibleResize as Flex
import XMonad.Actions.FloatKeys
import XMonad.Actions.UpdatePointer
import XMonad.Actions.WindowGo
-- import XMonad.Actions.Volume
import XMonad.Hooks.DynamicLog
import XMonad.Hooks.EwmhDesktops
import XMonad.Hooks.ManageDocks
import XMonad.Hooks.ManageHelpers

import XMonad.Layout
import XMonad.Layout.Circle
import XMonad.Layout.DragPane
import XMonad.Layout.Gaps
import XMonad.Layout.LayoutScreens
import XMonad.Layout.NoBorders
import XMonad.Layout.PerWorkspace
import XMonad.Layout.ResizableTile
import XMonad.Layout.Simplest
import XMonad.Layout.SimplestFloat
import XMonad.Layout.Spacing
import XMonad.Layout.ToggleLayouts
import XMonad.Layout.TwoPane
import XMonad.Layout.ThreeColumns

import XMonad.Prompt
import XMonad.Prompt.Window
import XMonad.Util.EZConfig
import XMonad.Util.Run
import XMonad.Util.Run(spawnPipe)
import XMonad.Util.SpawnOnce
-- import Xmonad.Util.Dzen

import Graphics.X11.ExtraTypes.XF86


myWorkspaces = ["1", "2", "3", "4", "5"]
modm = mod1Mask
myTerminal = "urxvt"

colorBlue      = "#4271f4"
colorGreen     = "#3bdb45"
colorRed       = "#db533b"
colorGray      = "#666666"
colorWhite     = "#bdbdbd"
colorNormalbg  = "#1c1c1c"
colorfg        = "#a8b6b8"


desktop "gnome"         = gnomeConfig
desktop "kde"           = kde4Config
desktop "xfce"          = xfceConfig
desktop "xmonad-mate"   = gnomeConfig
desktop _               = desktopConfig

main :: IO()
main = do
    session <- getEnv "DESKTOP_SESSION"
    wsbar <- spawnPipe myWsBar 
    let config = maybe desktopConfig desktop session
    xmonad $ config
    -- xmonad gnomeConfig
        { borderWidth       = borderwidth
        , terminal          = myTerminal
        , workspaces        = myWorkspaces
        , focusFollowsMouse = True
        , normalBorderColor = mynormalBorderColor
        , focusedBorderColor= myfocusedBorderColor
        , modMask           = modm
        , startupHook       = myStartupHook
        , layoutHook        = avoidStruts $ ( toggleLayouts (noBorders Full)
                                          $ myLayout
                                          )
        }

        `additionalKeysP`
        [ ("M-c"            , kill1)
        , ("M-f"            , sendMessage ToggleLayout)
        , ("M-S-f"          , withFocused (keysMoveWindow (-borderwidth,-borderwidth)))
        , ("M-C-<R>"        , withFocused (keysMoveWindow (moveWD, 0)))
        , ("M-C-<L>"        , withFocused (keysMoveWindow (-moveWD, 0)))
        , ("M-C-<U>"        , withFocused (keysMoveWindow (0, -moveWD)))
        , ("M-C-<D>"        , withFocused (keysMoveWindow (0, moveWD)))
        , ("M-<R>"          , nextWS )
        , ("M-<L>"          , prevWS )
        , ("M-l"            , nextWS )
        , ("M-h"            , prevWS )
        , ("M-S-<R>"        , shiftToNext)
        , ("M-S-<L>"        , shiftToPrev)
        , ("M-S-l"          , shiftToNext)
        , ("M-S-h"          , shiftToPrev)
        , ("M-j"            , windows W.focusDown)
        , ("M-k"            , windows W.focusUp)
        , ("M-S-j"          , windows W.swapDown)
        , ("M-S-k"          , windows W.swapUp)
        , ("M-<Tab>"        , nextScreen)
        , ("M-C-S-<Space>"  , rescreen)
        ]
 
        `additionalKeysP`
        [ ("M-<Return>"             , spawn "urxvt")
        -- Browser Start-up
        , ("M-g"                    , spawn "google-chrome-stable")
        -- Browser Seacret Mode
        , ("M-S-g"                  , spawn "google-chrome-stable --incognito")
        -- Start-up TweetDeck only
        , ("M-s"                    , spawn "slack")
        , ("M-p"                    , spawn "exe=`dmenu_run -fn 'Migu 1M:size=20'` && exec $exe")
        -- Take a screenshot
        , ("M-S-p"                  , spawn "deepin-screenshot")
        -- Volumekey Setting
        , ("<XF86AudioRaiseVolume>" , spawn "amixer set Master 5%+")
        , ("<XF86AudioLowerVolume>" , spawn "amixer set Master 5%-")
        -- Display Bright Key Setting
        , ("<XF86MonBrightnessUp>"  , spawn "xbacklight + 5 -time 100 -steps 1")
        , ("<XF86MonBrightnessDown>", spawn "xbacklight - 5 -time 100 -steps 1")

        ]

myStartupHook = do
        spawn "gnome-settings-daemon &"
        spawn "nm-applet"
        spawn "$HOME/.dropbox-dist/dropboxd &"
        spawn "nitrogen --restore &"
        spawn "stalonetray &"
        spawn "fcitx"
        -- spawn "$HOME/shscript/default.sh"
        -- spawn "$HOME/shscripts/display_layout_basic.sh"

borderwidth = 1

mynormalBorderColor  = "#262626"
myfocusedBorderColor = "#585858"

moveWD = borderwidth
resizeWD = borderwidth * 2

gapwidth  = 4
gwU = 10
gwD = 10
gwL = 30
gwR = 30

myLayout = spacing gapwidth $ gaps [(U, gwU),(D, gwD),(L, gwL),(R, gwR)]
            $ (ResizableTall 1 (1/201) (116/201) [])
                ||| (TwoPane (1/201) (90/201))
                ||| (TwoPane (1/201) (140/201))
                ||| (TwoPane (1/2) (1/2))
                ||| (dragPane Horizontal 0.1 0.5)
                ||| Simplest

myWsBar = "xmobar $HOME/.xmonad/.xmobarrc"
```
