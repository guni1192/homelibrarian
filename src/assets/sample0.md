# ArchLinuxのデスクトップ環境を構築する
ArchLinuxをインストールしたあとの作業です。  
ここからの作業は人それぞれになりますが、今回は私の環境を構築する際の手順を書いておきます。
### 使用環境
PC: Thikpad X250
DE: Gnome3
DM: GDM

### インターネット接続
Wifiを使うのはNetworkManagerを入れてからにします。

```
# systemctl enable dhcpcd.service
# systemctl start dhcpcd.service
```
### ユーザーの追加

```
# useradd -m -g wheel [USERNAME]
# passwd [USERNAME]
```

### sudoの導入

```
# pacman -S sudo
# visudo
```
以下のコメントアウトを外して有効化する

```  
Defaults env_keep += "HOME"  
%wheel ALL=(ALL) ALL
```
### ssh接続の設定

```
# pacman -S openssh
# systemctl enable sshd
# systemctl start sshd
# su [USER_NAME]
```

### ssh接続

```
$ ssh [USERNAME]@192.168.XX.X
```
### 必要なもののインストール

```
$ sudo pacman -S vim git zsh tmux
```

### X Window Systemのインストール

```
$ sudo pacman -S xorg-server xorg-server-utils xorg-xinit xorg-xclock xterm
```
グラフィックドライバはここを参考に  
https://wiki.archlinuxjp.org/index.php/Xorg  
自分はintelのグラフィックドライバなので

```
sudo pacman -S xf86-video-intel
```

### タッチパッドの設定

```
sudo pacman -S xf86-input-synaptics
```

タッチパッドの設定は/etc/X11/xorg.conf.d/に記述します。
設定ファイルはここを参考に  
https://wiki.archlinuxjp.org/index.php/Synaptics_%E3%82%BF%E3%83%83%E3%83%81%E3%83%91%E3%83%83%E3%83%89

ちなみに私の設定を載せておきます。  

```10-synaptics.conf
Section "InputClass"
    Identifier "touchpad catchall"
    Driver "synaptics"
    MatchIsTouchpad "on"
    MatchDevicePath "/dev/input/event*"
    #Option "TapButton1" "1"
    #Option "TapButton2" "2"
    #Option "TapButton3" "3"
    Option "VertScrollDelta"  "-111"
    Option "HorizScrollDelta" "-111"
    # 横エッジスクロール
    Option "HorizEdgeScroll" "on"
    # 縦エッジスクロール
    Option "VertEdgeScroll" "on"
    # 左右同時クリックで中ボタン
    Option "Emulate3Buttons" "on"
EndSection
```


### GNOMEの導入

``` 
$ sudo pacman -S gnome gnome-tweak-tool
```

ディスプレイマネージャの有効化

```
# systemctl enable gdm
```



### Yaourt(AURヘルパー)の導入
AUR(Arch User Repository)を使うための準備

```
# vim /etc/pacman.conf
```
以下を追記

```
[archlinuxfr]
SigLevel = Never
Server = http://repo.archlinux.fr/$arch
[pnsft-pur]
SigLevel = Optional TrustAll
Server = http://downloads.sourceforge.net/project/pnsft-aur/pur/$arch
```
以下のコメントアウトを外す

```
[multilib]
Include = /etc/pacman.d/mirrorlist
```
保存して終了する

```
# pacman --sync --refresh yaourt
# pacman -Syu
```
これでyaourtが使えるようになる

### 日本語フォントの導入
```
# yaourt -S otf-ipaexfont
```

### fcitxの導入
日本語を入力するため、fcitxとfcitx-mozcをインストールする

``` 
$ sudo pacman -S fcitx-im fcitx-mozc fcitx-configtool
```

.xprofileのに追記する

``` .xprofile
fcitx
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
export XMODIFIERS=@im=fcitx
```

###NetworkManagerの導入
NetworkManagerを導入する際にはntctlやwicdなどをを無効化しておく

```
$ sudo pacman -S networkmanager network-manager-applet xfce4-notifyd
$ sudo systemctl disable dhcpcd.service
$ sudo systemctl enable NetworkManager.service
```
