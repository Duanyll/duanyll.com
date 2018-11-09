---
author: duanyll
title: NOIP2018 RP++
tags: ["OI"]
date: 2018-11-9
layout: post
---

祝各位OIer NOIP2018 RP++！

<!-- more -->

```cpp
BigInteger RP = 1 << INF;
while(true){
    RP++;
}
```

```cpp
/* 
U{uJUjujuJjY[>vJjJjYv>[{jYuJuJJ<<[JJjY[<v[Y{ujJYu{vi>>v>vv[v[?[LjYJ{vi^>Y[<^>{JYJYj{JLJYuJJ{JYJ{YJu[ 
J>[{v[v{?[><vUL<<?riYJ<^>[>v><<uj>r><^<uvi^?>v>v</>2j<r[LYLJ><r><?>^^qPviiuqUrr><>>v?[>v>[>[?v>??v>> 
jLjJjYjYJL>/M&&/<iiN&&&vi<{L[i[&&Y/i/>&&&q^^[L{</u&&&&&GZZGqM&&u??i>&@&L>?&&@vJYujj[J{Y{Y{J{JYJLJLYv 
{LYJ{jYJ[>M&@&&B&X&&@F&&M2L<u&B&&M&MP&&XZ&&qYL^>Z&&Y>&&j/^r<5&@2/<F&&&PEP&@&0OOMM@PvvYLYLYL{[{[{[YLL 
Jvj{YLY{{^&@8&O&&&MEFUkO@@P/5&&M&Z&&BGqu1NB&B>E&&&&//Xkj&&@jSkNiY&&&&G''1&&<:/i::/>?{[{v{L{v{[{[{[Y> 
{L{JYjLYvr&&@&MEGSuSkNFSFuiiU&&&&EZNuF5PkS5S^iu5j&&E51Yu&&@UJ2FEJS>B&Z,O&&BkZOE@&G^[v{v{v{vL[{[L[Yvv 
J?JLYL{L{r?^Z&@G0&&O^r?@&O/r<<v&&EO0&&[//X&&r::'<&&>:iX&&@&&M>^<r:_M&&&&&&O./:_&&&^?LvLvLvLv[v{vLv[> 
{vLYLL[L>1EN&&@&&&&@vYJ&&M/vNNG&&M&&&&v<<E&&5SqqG&&EN&&B@&Mq&&O2^/'@&&>_&&&XEEF&&&/?[[v[v[vLv[vLvLv? 
{>L[{[Lv?Yk2J<^^YB&MXPN&&0r<22Ji:_^1&&&@&@&@BM@O@&&&&@8P&@&XZM&&MPjM&U''qBGJ12uZMPr>[?v?v>L?[?vvLvL> 
[>[[?[[Lv?r<^<r</i/i/i/i/^<>/:"i[kXE080EPSFqZ00EqPSXFPFqPPXkSXq0qZOONSS2/_,:/i//:i<>>?>v>v>?>v>?>v>> 
L<[>[>[>v>?>>>><><><><>r><<//YEM@BB8ZkqXkF0qqX11FS5U2FXkkSX5F5PXS50NSqBMBXY</i<<><>>><><><>>?>>>v>vr 
v>?[>?>v>v>?>v>><><>>>>><r_r8@BMMMGZ00PEqZNP5q2UYjLL>[Ju{{[v>JjjjS00uJ1S10GO5r:ir<<><><><><><><>>?<< 
vrv>>>>>><>>?>><><><><></:FB@GON0SNP0PP51uJLv?L<r//::_":::/_"_//i/<[L{FSk12UGOS</i<<><><><>r><>r<<>^ 
<<>><><><><><><><><>r<i:/O&BGZNX11U5Y{L[<r^><^/i//::::_"__,___,_,",,:<<vuPP2jE@@<:i<r>r<r<r<^<r<r<<< 
vi><><<<>r<r<<><><>r<i"i@&MO8NNFUL[v{>??[i<v[i/^i:/:/:/::_:::_:":_:__,::<LFFUuPB@r:i<r<^<^<^<^<r<r<^ 
<r<<^<r<r<r<^<<<r<r<i_v&&MOOZZX5JL?jj{[>vv>[>i<>/::/_","_:"_.,,"_:_:_:"::^>uu1F0M@//iririr^r^<^<rrri 
</<^<^<^<^r^r^r^<^r/:/&&B8O8OEN12[YU1jjL><>r?i>^i/i//_"_:,,' ''',,,,",:"::<>U5PNO&X_i/^i^/ri^i^i^ir/ 
^/^<iririri^iriii^ii,X&MOO8OZZPSJ[uS2UYJ></ii<//:://:/":_:_",",,',,,',_/:::<[F08O&0_:i/i/i/i/ii^i^// 
<:ri^i^i^/i/iii/i//:_M&MOOO8Z0quuuS51uJ>?<^///i::__,:_:::::::__,_,,',_::/"/<Yjq8M&u'//i/i///i///^ii: 
^:ii/iii/i/i/i///i//.O&BOMOOG8F5SF51j2jvr>>>^/:/,.'',__,,/:"'' ''''_'_":::/>J1qOM&i,://i/i///////i// 
^:i///i/i////://///:_:&&BOMOO0XFF221EEEXkS52FFk22{^'"i: ,:/://i/i/::^i/"_,/>>2OM&M._/:/:/:/:/:////i: 
/:////:/:/:/:///:/::"'/MBBOMOMOGkS0ONS5UJ[ri:////>{Sji  .P0uJUL[<</i<Y1FJi'/vPM&@['::::/:/:/:::/://: 
/_/:/:/:/:/:::/::::":',qZ0OOOE8MqN&EFS0q0qqNGPkF5i :&BPk&MNjju1jY><i_',_/8M{M@&@J __:"::::::/::::::_ 
/":::/:/::::":::":_:_':GF1SXSFU2u&SjEMF5FkU5kL<jZOJL&&&&@'>5k0ZMM0Pq5/'^Pj&&YEOS'',:":":":::::::"::_ 
:,:::":::":":""_:_:""'_0quU2X1FuuMU<j[L<<<>i//i./1q@@i "&>'/L<:,' ''/5OMu'OE.'j[''__"_:_:_"_:_:_:_:, 
:,::":":":_:_:______,,'2E1US1F55JXPY{r^<///><</:r8&@>.  ?&2./Lvv></:.<k, _Mv''?/'___,_,_,_,",","_"_, 
:':_:_"____,_,",_,_,_.',E5XU51F25uP2UJJ></:__,/jBBNY/,'  /&F::/:/",'' :__Fu"/:i',,,,_,_,_,_,_,_,_,_' 
_'_"__,_,_,,,_,,,_,_,_' JG55251S1FU5uuu2u5uuJ5G8jYUU/_' ' '15522ju[>r>YL>v"/:i''',',,,,,',',.,.,,_,' 
_'_,,._,,,,.,,,.,',','' :0Su52F5FSS1jri:_,_'i5N5NM&BZF2>kMS:/?JuuLv>?r:'_/^,:"''.'.'.',',',.,',.,',' 
,'.,.,',.,.,',',','.'.'' SZP252S5SFXkqU{?[?[LuuFXNqGEPJi^><^'  _/<//:/:ii^/"_,','.'''.'''.'''.',','' 
_ ,'..,','.','''.'.'.'''  ,SX1F2FUFFXk2FkujJY>r/:"".' ''    .,_,/<UuY<>^iii,,''''''''''''''''''''''  
'''.'''''''''''''''''''''  j0S1S5F5SU[/jqkkX2j><^^/,'''' ''.,//r^<^ri:_:/</, ''''''''''''''''''''''' 
, .''''''''''''''''''''''' ^O5FSk5F51Yi,LZMOOOMMMOOZOZPqqPPS2>v{?//,""":^<' ''''' '''''''''''''''''  
' ''''''''''''''''''''''''  kX2SSS1S5SL//uF2uFuUjYLJ?[Yv<[<i_''///::://^[" ' ''''''' ' ''''''' ' ''  
' ''' ''''''''''''' ' '     >X1UFFS5PkSJ>:[JLLY[L^^r>/i/:.'',,"_//rir^LJ/     ' ' ' ' ' ' ' ' ' ' '  
' '''' ''' ' ' ' '   '     /&0YSUkSkkqq05<:YuL<>>>r<r^//::":_:_,"r<??uY,                     '   '   
' ' ' ' '                'N&&B{vXkSXqXNq8S[iL[>/:,:_,_, '''._',:<>?vL:                               
                        u&&@M@@jiuP0PqPq0G0Puujjv</i:i/:,"_::/<uuuL<'                                
'                'vFM&&&&BMOMOB&8i:L0EGN00GZG0NPNFUJuUFUujUjujjLY[:                                  
             :jM&&&&&&&@MMOMOMOM@&5_'rjXZ8E8N0P0qZZGGOOO00SF2Ujj[/LEu{>^_                            
         'LZ&&&@@MBMMOMOMOO8OOMOMM&@U,',i>US00ZXkFXSX21ujJjJUuJr' Z&&&&&&@&OS>_                      
   ':vuZ&&&&MOZGZO8MOMOOOMOMOOOMOMM@&&>,,:_:/vuq0NSk2Y<ri^ir/,    Z&0E8OOMM@&&@&@8U^                 
PZ&&&@&@BOOZ8E8E8G8ZOGOOOOOOOOMOMOMOB@&k/_/"_     .:>i"_"'        @MZqZEGZGG8GOOB@&&&@O2Y/           
&@MMOO8OZGEG0ZE8ZGEGZ88MO8GOGO8MOO8O8MM&8: ''      _[XuX2jj/     '&ME00ZEZEZEZ08EZEG8M@&&&@&Zu/'     
OZ8ZGZZZGEGZZEGEGZGE8ZOOOGOZ8G8GOZO8O8OO@M"     i8GOSj5LS150&0   '&M8N0NE0ENZEZEZEZEZEZ08GOM&&&&&ZJ' 
ZZEZZGE8EGEGEGEGE8EGZ88MOO8OZOZOG8GOG8ZO8@@j  J&&&&MGXuj<uUB&&0   ZBZENZqZ0ZEZ0E0GEZ0Z0Z0Z0ZEGZOM&&& 
808E8EGEGZGZ80GEZEGEZZOOM8OZO8O8OZOGO8OG8GM&G _Pqu0M@8PN[>8q/u8Z: S@80ZqZ0Z0ENG0G0GEZNZNZEZ0E0ENEE80 
ZZE8ZGE8Z8ZGZG0GE8GGEZOMO8ZOZOZ8Z8Z8Z8ZZ0GEO&M  Jv'/jGMMP1Z     'iLBGZ0ZN0NE0EEZ0ZEZ0EqZ0ZEZ0ENZNE00 
808Z8ZGE8E8ZGG8GGE8E8EMMME8ZGEZEGE8Z8EZ08EZZO&&  Y2''NGO8<Xi     "Y2M0GEZEE0ENZNE0ZNENZEG0Z0E0E0ENZq 
ZZEZEGEGEZE8GOM@BMOO8OMBMMOMOM8OOMOO8O8O8O8O8M@&/ vEXMGNq5FO'     15OG080GEZEZNE0ENE0EEGEZ0ENZNE0EN0 
8NGZ8EGZ8EGZOOFYk8&&&&BGOOMMBMB@&&&@&&&&&&&@&@&&&/.M&@&BM<>PM^   'uUMEZEG0ZEZ0Z0E0ZEZEZEG0ENZNE0E0Eq 
88EGE8E8E8ZO&&Y:'''''/LOGOGGZM&L     ''' '      2&OM/''EOX5{u&k  S{LOO08Z8ZZEGE8Z88OG8Z8ZZ0ZNZ0ZNE00 
MZOZZ0GZGZM8i/>LLv>,i'/B&&&MGM&M88MOB&   @BOMOOG@BB@   M&Eu8MLNZk&G[OO8O&&&G8ZM&&&&&&&&@OEE0E0Z0ZNEq 
MMO8ZZE8GB@&uU1kN/  F&@&X  /MM25SXSqGM  >&GqkPSXUXM&   <.''_>OPuNi::8BMG":r@O@&S/...://_kONE0Z0ENEE0 
8OBOOE8EM/  :r/,LP   FF   rZ&M_ ''''r     ','''''i&@'   <v'   JBY   @M&P   &&E   10/   X8ZZ0Z0ENZ0GN 
008BMMGGONXM&?  YE     >&&@&B@@&&&&&&     G&&&@&&&M&   &&O&P   MJ  ,&B&M   &&G  .&&X  _&OZ0E0E0Z0000 
MEZOBOOGM&&@_  S&5  E>  <M&&&B&&&&&>  <O  Z&&@&u[S&&   B&B8:  'Mu  '&&&S   @&&<  /^,>G&@OEZ0EEZEZNEN 
MMGOMMOMM{   i@&&u  N&O/   '1&@Bu'   q&E  [BN8k   &&    ,_   /OqL'   "     &&B   Y>LYu28MOZ8ZGE0EE00 
8GMOMMMO@U/j&@X '   8&&@&0>:qB<   LO&&&Mi '     :8@MX50NY[u^X8F[q&&J:[FB05kM&Y  2ZXPN   XMZEZ0Z0Z0Zq 
E0EOOMOOO&&&MMOOO@&&M8Z8O@@&OOOB&&@&OGZM&&&&&&&&@by t123yh&&X^LjLM@&N&BB@&MO@?  /L{vi  [MOqEq0N0N0qN 
*/
```

~~本来想示弱的，但听说考前示弱会真的变弱，就取消了~~