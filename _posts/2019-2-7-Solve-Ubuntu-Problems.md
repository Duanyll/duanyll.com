---
title: 解决Ubuntu使用中遇到的几个问题
tags: [Ubuntu]
author: duanyll
---

## 无法关机,一直闪光标

打开`/etc/default/grub`,删去里面的`quiet splash`,然后运行`sudo update-grub`,就可以在开关机时显示日志信息了.

```conf
GRUB_DEFAULT=0
GRUB_TIMEOUT_STYLE=hidden
GRUB_TIMEOUT=10
GRUB_DISTRIBUTOR=`lsb_release -i -s 2> /dev/null || echo Debian`
GRUB_CMDLINE_LINUX_DEFAULT="acpi_osi=Linux"
GRUB_CMDLINE_LINUX=""
```

根据我的日志信息,我发现无法关机的原因是Grub在等待运行的程序90秒再强制结束,所以解决方案是关机前先关掉所有打开的程序来避免90秒等待.

## 网易云音乐打不开

这个问题网上很多教程都是治标不治本,本质上都是花式`sudo netease-cloud-music`,但是你不觉得让一个音乐播放器具有root权限很不正常(危险)吗?而且有些半吊子教程还喊你把整个用户都设为sudo不要密码...无力吐槽

正确的解决方案:经过我观察,网易云音乐在Ubuntu 18.04水土不服的主要原因一是Gnome的沙盒模式,二是不知为何对缓存文件夹没有权限,所以请

```sh
sudo vim /usr/share/applications/netease-cloud-music.desktop
```

然后在`%U`的前面加一个`--no-sandbox`,然后保存退出

```conf
[Desktop Entry]
Version=1.0
Type=Application
Name=NetEase Cloud Music
Name[zh_CN]=网易云音乐
Name[zh_TW]=網易雲音樂
Comment=NetEase Cloud Music
Comment[zh_CN]=网易云音乐
Comment[zh_TW]=網易雲音樂
Icon=netease-cloud-music
Exec=netease-cloud-music --no-sandbox %U
Categories=AudioVideo;Player;
Terminal=false
StartupNotify=true
StartupWMClass=netease-cloud-music
MimeType=audio/aac;audio/flac;audio/mp3;audio/mp4;audio/mpeg;audio/ogg;audio/x-ape;audio/x-flac;audio/x-mp3;audio/x-mpeg;audio/x-ms-wma;audio/x-vorbis;audio/x-vorbis+ogg;audio/x-wav;
```

接下来在终端运行以下命令来解决缓存文件夹权限问题

```sh
sudo chmod -R 777 ~/.cache/netease-cloud-music
```

反正在我的电脑上管用~

## Grub Vimix主题无法安装

Vimix是目前Gnome looks网站上排名第2的主题,然而它的安装脚本犯了一个极其显然的错误,写错了一个路径名...改成这样就可以了(把`/boot/grub/themes/Vimix/theme.txt`改成`/boot/grub/themes/theme.txt`)

```sh
#!/bin/bash

ROOT_UID=0

# check command avalibility
function has_command() {
    command -v $1 > /dev/null
}

if [ "$UID" -eq "$ROOT_UID" ]; then

  # Copy Vimix
  cp -a Vimix /boot/grub/themes

  # Set Vimix
  grep "GRUB_THEME=" /etc/default/grub 2>&1 >/dev/null && sed -i '/GRUB_THEME=/d' /etc/default/grub
  echo "GRUB_THEME=\"/boot/grub/themes/theme.txt\"" >> /etc/default/grub

  # update grub
  if has_command update-grub; then
    update-grub
  elif has_command grub-mkconfig; then
    grub-mkconfig -o /boot/grub/grub.cfg
  fi

  echo -e "\n All done!"

else
  echo -e "\n Please run this script by root..."
fi
```