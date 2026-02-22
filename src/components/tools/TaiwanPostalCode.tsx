'use client'
import { useState, useMemo } from 'react'

interface TaiwanPostalCodeProps {
  labels?: {
    search: string
    searchPlaceholder: string
    city: string
    district: string
    postalCode: string
    allCities: string
    noResults: string
    clickToCopy: string
    copied: string
  }
}

const POSTAL_DATA: { city: string; district: string; code: string }[] = [
  // 台北市
  { city: '台北市', district: '中正區', code: '100' },
  { city: '台北市', district: '大同區', code: '103' },
  { city: '台北市', district: '中山區', code: '104' },
  { city: '台北市', district: '松山區', code: '105' },
  { city: '台北市', district: '大安區', code: '106' },
  { city: '台北市', district: '萬華區', code: '108' },
  { city: '台北市', district: '信義區', code: '110' },
  { city: '台北市', district: '士林區', code: '111' },
  { city: '台北市', district: '北投區', code: '112' },
  { city: '台北市', district: '內湖區', code: '114' },
  { city: '台北市', district: '南港區', code: '115' },
  { city: '台北市', district: '文山區', code: '116' },
  // 新北市
  { city: '新北市', district: '萬里區', code: '207' },
  { city: '新北市', district: '金山區', code: '208' },
  { city: '新北市', district: '板橋區', code: '220' },
  { city: '新北市', district: '汐止區', code: '221' },
  { city: '新北市', district: '深坑區', code: '222' },
  { city: '新北市', district: '石碇區', code: '223' },
  { city: '新北市', district: '瑞芳區', code: '224' },
  { city: '新北市', district: '平溪區', code: '226' },
  { city: '新北市', district: '雙溪區', code: '227' },
  { city: '新北市', district: '貢寮區', code: '228' },
  { city: '新北市', district: '新店區', code: '231' },
  { city: '新北市', district: '坪林區', code: '232' },
  { city: '新北市', district: '烏來區', code: '233' },
  { city: '新北市', district: '永和區', code: '234' },
  { city: '新北市', district: '中和區', code: '235' },
  { city: '新北市', district: '土城區', code: '236' },
  { city: '新北市', district: '三峽區', code: '237' },
  { city: '新北市', district: '樹林區', code: '238' },
  { city: '新北市', district: '鶯歌區', code: '239' },
  { city: '新北市', district: '三重區', code: '241' },
  { city: '新北市', district: '新莊區', code: '242' },
  { city: '新北市', district: '泰山區', code: '243' },
  { city: '新北市', district: '林口區', code: '244' },
  { city: '新北市', district: '蘆洲區', code: '247' },
  { city: '新北市', district: '五股區', code: '248' },
  { city: '新北市', district: '八里區', code: '249' },
  { city: '新北市', district: '淡水區', code: '251' },
  { city: '新北市', district: '三芝區', code: '252' },
  { city: '新北市', district: '石門區', code: '253' },
  // 基隆市
  { city: '基隆市', district: '仁愛區', code: '200' },
  { city: '基隆市', district: '信義區', code: '201' },
  { city: '基隆市', district: '中正區', code: '202' },
  { city: '基隆市', district: '中山區', code: '203' },
  { city: '基隆市', district: '安樂區', code: '204' },
  { city: '基隆市', district: '暖暖區', code: '205' },
  { city: '基隆市', district: '七堵區', code: '206' },
  // 桃園市
  { city: '桃園市', district: '中壢區', code: '320' },
  { city: '桃園市', district: '平鎮區', code: '324' },
  { city: '桃園市', district: '龍潭區', code: '325' },
  { city: '桃園市', district: '楊梅區', code: '326' },
  { city: '桃園市', district: '新屋區', code: '327' },
  { city: '桃園市', district: '觀音區', code: '328' },
  { city: '桃園市', district: '桃園區', code: '330' },
  { city: '桃園市', district: '龜山區', code: '333' },
  { city: '桃園市', district: '八德區', code: '334' },
  { city: '桃園市', district: '大溪區', code: '335' },
  { city: '桃園市', district: '復興區', code: '336' },
  { city: '桃園市', district: '大園區', code: '337' },
  { city: '桃園市', district: '蘆竹區', code: '338' },
  // 新竹市
  { city: '新竹市', district: '東區', code: '300' },
  { city: '新竹市', district: '北區', code: '300' },
  { city: '新竹市', district: '香山區', code: '300' },
  // 新竹縣
  { city: '新竹縣', district: '竹北市', code: '302' },
  { city: '新竹縣', district: '湖口鄉', code: '303' },
  { city: '新竹縣', district: '新豐鄉', code: '304' },
  { city: '新竹縣', district: '新埔鎮', code: '305' },
  { city: '新竹縣', district: '關西鎮', code: '306' },
  { city: '新竹縣', district: '芎林鄉', code: '307' },
  { city: '新竹縣', district: '寶山鄉', code: '308' },
  { city: '新竹縣', district: '竹東鎮', code: '310' },
  { city: '新竹縣', district: '五峰鄉', code: '311' },
  { city: '新竹縣', district: '橫山鄉', code: '312' },
  { city: '新竹縣', district: '尖石鄉', code: '313' },
  { city: '新竹縣', district: '北埔鄉', code: '314' },
  { city: '新竹縣', district: '峨眉鄉', code: '315' },
  // 苗栗縣
  { city: '苗栗縣', district: '竹南鎮', code: '350' },
  { city: '苗栗縣', district: '頭份市', code: '351' },
  { city: '苗栗縣', district: '三灣鄉', code: '352' },
  { city: '苗栗縣', district: '南庄鄉', code: '353' },
  { city: '苗栗縣', district: '獅潭鄉', code: '354' },
  { city: '苗栗縣', district: '後龍鎮', code: '356' },
  { city: '苗栗縣', district: '通霄鎮', code: '357' },
  { city: '苗栗縣', district: '苑裡鎮', code: '358' },
  { city: '苗栗縣', district: '苗栗市', code: '360' },
  { city: '苗栗縣', district: '造橋鄉', code: '361' },
  { city: '苗栗縣', district: '頭屋鄉', code: '362' },
  { city: '苗栗縣', district: '公館鄉', code: '363' },
  { city: '苗栗縣', district: '大湖鄉', code: '364' },
  { city: '苗栗縣', district: '泰安鄉', code: '365' },
  { city: '苗栗縣', district: '銅鑼鄉', code: '366' },
  { city: '苗栗縣', district: '三義鄉', code: '367' },
  { city: '苗栗縣', district: '西湖鄉', code: '368' },
  { city: '苗栗縣', district: '卓蘭鎮', code: '369' },
  // 台中市
  { city: '台中市', district: '中區', code: '400' },
  { city: '台中市', district: '東區', code: '401' },
  { city: '台中市', district: '南區', code: '402' },
  { city: '台中市', district: '西區', code: '403' },
  { city: '台中市', district: '北區', code: '404' },
  { city: '台中市', district: '北屯區', code: '406' },
  { city: '台中市', district: '西屯區', code: '407' },
  { city: '台中市', district: '南屯區', code: '408' },
  { city: '台中市', district: '太平區', code: '411' },
  { city: '台中市', district: '大里區', code: '412' },
  { city: '台中市', district: '霧峰區', code: '413' },
  { city: '台中市', district: '烏日區', code: '414' },
  { city: '台中市', district: '豐原區', code: '420' },
  { city: '台中市', district: '后里區', code: '421' },
  { city: '台中市', district: '石岡區', code: '422' },
  { city: '台中市', district: '東勢區', code: '423' },
  { city: '台中市', district: '和平區', code: '424' },
  { city: '台中市', district: '新社區', code: '426' },
  { city: '台中市', district: '潭子區', code: '427' },
  { city: '台中市', district: '大雅區', code: '428' },
  { city: '台中市', district: '神岡區', code: '429' },
  { city: '台中市', district: '大肚區', code: '432' },
  { city: '台中市', district: '沙鹿區', code: '433' },
  { city: '台中市', district: '龍井區', code: '434' },
  { city: '台中市', district: '梧棲區', code: '435' },
  { city: '台中市', district: '清水區', code: '436' },
  { city: '台中市', district: '大甲區', code: '437' },
  { city: '台中市', district: '外埔區', code: '438' },
  { city: '台中市', district: '大安區', code: '439' },
  // 彰化縣
  { city: '彰化縣', district: '彰化市', code: '500' },
  { city: '彰化縣', district: '芬園鄉', code: '502' },
  { city: '彰化縣', district: '花壇鄉', code: '503' },
  { city: '彰化縣', district: '秀水鄉', code: '504' },
  { city: '彰化縣', district: '鹿港鎮', code: '505' },
  { city: '彰化縣', district: '福興鄉', code: '506' },
  { city: '彰化縣', district: '線西鄉', code: '507' },
  { city: '彰化縣', district: '和美鎮', code: '508' },
  { city: '彰化縣', district: '伸港鄉', code: '509' },
  { city: '彰化縣', district: '員林市', code: '510' },
  { city: '彰化縣', district: '社頭鄉', code: '511' },
  { city: '彰化縣', district: '永靖鄉', code: '512' },
  { city: '彰化縣', district: '埔心鄉', code: '513' },
  { city: '彰化縣', district: '溪湖鎮', code: '514' },
  { city: '彰化縣', district: '大村鄉', code: '515' },
  { city: '彰化縣', district: '埔鹽鄉', code: '516' },
  { city: '彰化縣', district: '田中鎮', code: '520' },
  { city: '彰化縣', district: '北斗鎮', code: '521' },
  { city: '彰化縣', district: '田尾鄉', code: '522' },
  { city: '彰化縣', district: '埤頭鄉', code: '523' },
  { city: '彰化縣', district: '溪州鄉', code: '524' },
  { city: '彰化縣', district: '竹塘鄉', code: '525' },
  { city: '彰化縣', district: '二林鎮', code: '526' },
  { city: '彰化縣', district: '大城鄉', code: '527' },
  { city: '彰化縣', district: '芳苑鄉', code: '528' },
  { city: '彰化縣', district: '二水鄉', code: '530' },
  // 南投縣
  { city: '南投縣', district: '南投市', code: '540' },
  { city: '南投縣', district: '中寮鄉', code: '541' },
  { city: '南投縣', district: '草屯鎮', code: '542' },
  { city: '南投縣', district: '國姓鄉', code: '544' },
  { city: '南投縣', district: '埔里鎮', code: '545' },
  { city: '南投縣', district: '仁愛鄉', code: '546' },
  { city: '南投縣', district: '名間鄉', code: '551' },
  { city: '南投縣', district: '集集鎮', code: '552' },
  { city: '南投縣', district: '水里鄉', code: '553' },
  { city: '南投縣', district: '魚池鄉', code: '555' },
  { city: '南投縣', district: '信義鄉', code: '556' },
  { city: '南投縣', district: '竹山鎮', code: '557' },
  { city: '南投縣', district: '鹿谷鄉', code: '558' },
  // 雲林縣
  { city: '雲林縣', district: '斗南鎮', code: '630' },
  { city: '雲林縣', district: '大埤鄉', code: '631' },
  { city: '雲林縣', district: '虎尾鎮', code: '632' },
  { city: '雲林縣', district: '土庫鎮', code: '633' },
  { city: '雲林縣', district: '褒忠鄉', code: '634' },
  { city: '雲林縣', district: '東勢鄉', code: '635' },
  { city: '雲林縣', district: '台西鄉', code: '636' },
  { city: '雲林縣', district: '崙背鄉', code: '637' },
  { city: '雲林縣', district: '麥寮鄉', code: '638' },
  { city: '雲林縣', district: '斗六市', code: '640' },
  { city: '雲林縣', district: '林內鄉', code: '643' },
  { city: '雲林縣', district: '古坑鄉', code: '646' },
  { city: '雲林縣', district: '莿桐鄉', code: '647' },
  { city: '雲林縣', district: '西螺鎮', code: '648' },
  { city: '雲林縣', district: '二崙鄉', code: '649' },
  { city: '雲林縣', district: '北港鎮', code: '651' },
  { city: '雲林縣', district: '水林鄉', code: '652' },
  { city: '雲林縣', district: '口湖鄉', code: '653' },
  { city: '雲林縣', district: '四湖鄉', code: '654' },
  { city: '雲林縣', district: '元長鄉', code: '655' },
  // 嘉義市
  { city: '嘉義市', district: '東區', code: '600' },
  { city: '嘉義市', district: '西區', code: '600' },
  // 嘉義縣
  { city: '嘉義縣', district: '番路鄉', code: '602' },
  { city: '嘉義縣', district: '梅山鄉', code: '603' },
  { city: '嘉義縣', district: '竹崎鄉', code: '604' },
  { city: '嘉義縣', district: '阿里山鄉', code: '605' },
  { city: '嘉義縣', district: '中埔鄉', code: '606' },
  { city: '嘉義縣', district: '大埔鄉', code: '607' },
  { city: '嘉義縣', district: '水上鄉', code: '608' },
  { city: '嘉義縣', district: '鹿草鄉', code: '611' },
  { city: '嘉義縣', district: '太保市', code: '612' },
  { city: '嘉義縣', district: '朴子市', code: '613' },
  { city: '嘉義縣', district: '東石鄉', code: '614' },
  { city: '嘉義縣', district: '六腳鄉', code: '615' },
  { city: '嘉義縣', district: '新港鄉', code: '616' },
  { city: '嘉義縣', district: '民雄鄉', code: '621' },
  { city: '嘉義縣', district: '大林鎮', code: '622' },
  { city: '嘉義縣', district: '溪口鄉', code: '623' },
  { city: '嘉義縣', district: '義竹鄉', code: '624' },
  { city: '嘉義縣', district: '布袋鎮', code: '625' },
  // 台南市
  { city: '台南市', district: '中西區', code: '700' },
  { city: '台南市', district: '東區', code: '701' },
  { city: '台南市', district: '南區', code: '702' },
  { city: '台南市', district: '北區', code: '704' },
  { city: '台南市', district: '安平區', code: '708' },
  { city: '台南市', district: '安南區', code: '709' },
  { city: '台南市', district: '永康區', code: '710' },
  { city: '台南市', district: '歸仁區', code: '711' },
  { city: '台南市', district: '新化區', code: '712' },
  { city: '台南市', district: '左鎮區', code: '713' },
  { city: '台南市', district: '玉井區', code: '714' },
  { city: '台南市', district: '楠西區', code: '715' },
  { city: '台南市', district: '南化區', code: '716' },
  { city: '台南市', district: '仁德區', code: '717' },
  { city: '台南市', district: '關廟區', code: '718' },
  { city: '台南市', district: '龍崎區', code: '719' },
  { city: '台南市', district: '官田區', code: '720' },
  { city: '台南市', district: '麻豆區', code: '721' },
  { city: '台南市', district: '佳里區', code: '722' },
  { city: '台南市', district: '西港區', code: '723' },
  { city: '台南市', district: '七股區', code: '724' },
  { city: '台南市', district: '將軍區', code: '725' },
  { city: '台南市', district: '學甲區', code: '726' },
  { city: '台南市', district: '北門區', code: '727' },
  { city: '台南市', district: '新營區', code: '730' },
  { city: '台南市', district: '後壁區', code: '731' },
  { city: '台南市', district: '白河區', code: '732' },
  { city: '台南市', district: '東山區', code: '733' },
  { city: '台南市', district: '六甲區', code: '734' },
  { city: '台南市', district: '下營區', code: '735' },
  { city: '台南市', district: '柳營區', code: '736' },
  { city: '台南市', district: '鹽水區', code: '737' },
  { city: '台南市', district: '善化區', code: '741' },
  { city: '台南市', district: '大內區', code: '742' },
  { city: '台南市', district: '山上區', code: '743' },
  { city: '台南市', district: '新市區', code: '744' },
  { city: '台南市', district: '安定區', code: '745' },
  // 高雄市
  { city: '高雄市', district: '新興區', code: '800' },
  { city: '高雄市', district: '前金區', code: '801' },
  { city: '高雄市', district: '苓雅區', code: '802' },
  { city: '高雄市', district: '鹽埕區', code: '803' },
  { city: '高雄市', district: '鼓山區', code: '804' },
  { city: '高雄市', district: '旗津區', code: '805' },
  { city: '高雄市', district: '前鎮區', code: '806' },
  { city: '高雄市', district: '三民區', code: '807' },
  { city: '高雄市', district: '楠梓區', code: '811' },
  { city: '高雄市', district: '小港區', code: '812' },
  { city: '高雄市', district: '左營區', code: '813' },
  { city: '高雄市', district: '仁武區', code: '814' },
  { city: '高雄市', district: '大社區', code: '815' },
  { city: '高雄市', district: '岡山區', code: '820' },
  { city: '高雄市', district: '路竹區', code: '821' },
  { city: '高雄市', district: '阿蓮區', code: '822' },
  { city: '高雄市', district: '田寮區', code: '823' },
  { city: '高雄市', district: '燕巢區', code: '824' },
  { city: '高雄市', district: '橋頭區', code: '825' },
  { city: '高雄市', district: '梓官區', code: '826' },
  { city: '高雄市', district: '彌陀區', code: '827' },
  { city: '高雄市', district: '永安區', code: '828' },
  { city: '高雄市', district: '湖內區', code: '829' },
  { city: '高雄市', district: '鳳山區', code: '830' },
  { city: '高雄市', district: '大寮區', code: '831' },
  { city: '高雄市', district: '林園區', code: '832' },
  { city: '高雄市', district: '鳥松區', code: '833' },
  { city: '高雄市', district: '大樹區', code: '840' },
  { city: '高雄市', district: '旗山區', code: '842' },
  { city: '高雄市', district: '美濃區', code: '843' },
  { city: '高雄市', district: '六龜區', code: '844' },
  { city: '高雄市', district: '內門區', code: '845' },
  { city: '高雄市', district: '杉林區', code: '846' },
  { city: '高雄市', district: '甲仙區', code: '847' },
  { city: '高雄市', district: '桃源區', code: '848' },
  { city: '高雄市', district: '那瑪夏區', code: '849' },
  { city: '高雄市', district: '茂林區', code: '851' },
  { city: '高雄市', district: '茄萣區', code: '852' },
  // 屏東縣
  { city: '屏東縣', district: '屏東市', code: '900' },
  { city: '屏東縣', district: '三地門鄉', code: '901' },
  { city: '屏東縣', district: '霧台鄉', code: '902' },
  { city: '屏東縣', district: '瑪家鄉', code: '903' },
  { city: '屏東縣', district: '九如鄉', code: '904' },
  { city: '屏東縣', district: '里港鄉', code: '905' },
  { city: '屏東縣', district: '高樹鄉', code: '906' },
  { city: '屏東縣', district: '鹽埔鄉', code: '907' },
  { city: '屏東縣', district: '長治鄉', code: '908' },
  { city: '屏東縣', district: '麟洛鄉', code: '909' },
  { city: '屏東縣', district: '竹田鄉', code: '911' },
  { city: '屏東縣', district: '內埔鄉', code: '912' },
  { city: '屏東縣', district: '萬丹鄉', code: '913' },
  { city: '屏東縣', district: '潮州鎮', code: '920' },
  { city: '屏東縣', district: '泰武鄉', code: '921' },
  { city: '屏東縣', district: '來義鄉', code: '922' },
  { city: '屏東縣', district: '萬巒鄉', code: '923' },
  { city: '屏東縣', district: '崁頂鄉', code: '924' },
  { city: '屏東縣', district: '新埤鄉', code: '925' },
  { city: '屏東縣', district: '南州鄉', code: '926' },
  { city: '屏東縣', district: '林邊鄉', code: '927' },
  { city: '屏東縣', district: '東港鎮', code: '928' },
  { city: '屏東縣', district: '琉球鄉', code: '929' },
  { city: '屏東縣', district: '佳冬鄉', code: '931' },
  { city: '屏東縣', district: '新園鄉', code: '932' },
  { city: '屏東縣', district: '枋寮鄉', code: '940' },
  { city: '屏東縣', district: '枋山鄉', code: '941' },
  { city: '屏東縣', district: '春日鄉', code: '942' },
  { city: '屏東縣', district: '獅子鄉', code: '943' },
  { city: '屏東縣', district: '車城鄉', code: '944' },
  { city: '屏東縣', district: '牡丹鄉', code: '945' },
  { city: '屏東縣', district: '恆春鎮', code: '946' },
  { city: '屏東縣', district: '滿州鄉', code: '947' },
  // 宜蘭縣
  { city: '宜蘭縣', district: '宜蘭市', code: '260' },
  { city: '宜蘭縣', district: '頭城鎮', code: '261' },
  { city: '宜蘭縣', district: '礁溪鄉', code: '262' },
  { city: '宜蘭縣', district: '壯圍鄉', code: '263' },
  { city: '宜蘭縣', district: '員山鄉', code: '264' },
  { city: '宜蘭縣', district: '羅東鎮', code: '265' },
  { city: '宜蘭縣', district: '三星鄉', code: '266' },
  { city: '宜蘭縣', district: '大同鄉', code: '267' },
  { city: '宜蘭縣', district: '五結鄉', code: '268' },
  { city: '宜蘭縣', district: '冬山鄉', code: '269' },
  { city: '宜蘭縣', district: '蘇澳鎮', code: '270' },
  { city: '宜蘭縣', district: '南澳鄉', code: '272' },
  // 花蓮縣
  { city: '花蓮縣', district: '花蓮市', code: '970' },
  { city: '花蓮縣', district: '新城鄉', code: '971' },
  { city: '花蓮縣', district: '秀林鄉', code: '972' },
  { city: '花蓮縣', district: '吉安鄉', code: '973' },
  { city: '花蓮縣', district: '壽豐鄉', code: '974' },
  { city: '花蓮縣', district: '鳳林鎮', code: '975' },
  { city: '花蓮縣', district: '光復鄉', code: '976' },
  { city: '花蓮縣', district: '豐濱鄉', code: '977' },
  { city: '花蓮縣', district: '瑞穗鄉', code: '978' },
  { city: '花蓮縣', district: '萬榮鄉', code: '979' },
  { city: '花蓮縣', district: '玉里鎮', code: '981' },
  { city: '花蓮縣', district: '卓溪鄉', code: '982' },
  { city: '花蓮縣', district: '富里鄉', code: '983' },
  // 台東縣
  { city: '台東縣', district: '台東市', code: '950' },
  { city: '台東縣', district: '綠島鄉', code: '951' },
  { city: '台東縣', district: '蘭嶼鄉', code: '952' },
  { city: '台東縣', district: '延平鄉', code: '953' },
  { city: '台東縣', district: '卑南鄉', code: '954' },
  { city: '台東縣', district: '鹿野鄉', code: '955' },
  { city: '台東縣', district: '關山鎮', code: '956' },
  { city: '台東縣', district: '海端鄉', code: '957' },
  { city: '台東縣', district: '池上鄉', code: '958' },
  { city: '台東縣', district: '東河鄉', code: '959' },
  { city: '台東縣', district: '成功鎮', code: '961' },
  { city: '台東縣', district: '長濱鄉', code: '962' },
  { city: '台東縣', district: '太麻里鄉', code: '963' },
  { city: '台東縣', district: '金峰鄉', code: '964' },
  { city: '台東縣', district: '大武鄉', code: '965' },
  { city: '台東縣', district: '達仁鄉', code: '966' },
  // 澎湖縣
  { city: '澎湖縣', district: '馬公市', code: '880' },
  { city: '澎湖縣', district: '西嶼鄉', code: '881' },
  { city: '澎湖縣', district: '望安鄉', code: '882' },
  { city: '澎湖縣', district: '七美鄉', code: '883' },
  { city: '澎湖縣', district: '白沙鄉', code: '884' },
  { city: '澎湖縣', district: '湖西鄉', code: '885' },
  // 金門縣
  { city: '金門縣', district: '金沙鎮', code: '890' },
  { city: '金門縣', district: '金湖鎮', code: '891' },
  { city: '金門縣', district: '金寧鄉', code: '892' },
  { city: '金門縣', district: '金城鎮', code: '893' },
  { city: '金門縣', district: '烈嶼鄉', code: '894' },
  { city: '金門縣', district: '烏坵鄉', code: '896' },
  // 連江縣(馬祖)
  { city: '連江縣', district: '南竿鄉', code: '209' },
  { city: '連江縣', district: '北竿鄉', code: '210' },
  { city: '連江縣', district: '莒光鄉', code: '211' },
  { city: '連江縣', district: '東引鄉', code: '212' },
]

export default function TaiwanPostalCode({ labels }: TaiwanPostalCodeProps) {
  const l = {
    search: labels?.search ?? '搜尋',
    searchPlaceholder: labels?.searchPlaceholder ?? '輸入區域名稱或郵遞區號...',
    city: labels?.city ?? '縣市',
    district: labels?.district ?? '鄉鎮市區',
    postalCode: labels?.postalCode ?? '郵遞區號',
    allCities: labels?.allCities ?? '所有縣市',
    noResults: labels?.noResults ?? '找不到結果',
    clickToCopy: labels?.clickToCopy ?? '點擊複製',
    copied: labels?.copied ?? '已複製！',
  }

  const [search, setSearch] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const cities = useMemo(() => [...new Set(POSTAL_DATA.map((d) => d.city))], [])

  const filtered = useMemo(() => {
    let data = POSTAL_DATA
    if (selectedCity) data = data.filter((d) => d.city === selectedCity)
    if (search) {
      const q = search.trim().toLowerCase()
      data = data.filter((d) => d.city.toLowerCase().includes(q) || d.district.toLowerCase().includes(q) || d.code.includes(q))
    }
    return data
  }, [search, selectedCity])

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 1500)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          style={{ flex: '0 0 auto', padding: '0.5rem 0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem', backgroundColor: 'var(--color-bg-secondary)', fontSize: '1rem' }}
        >
          <option value="">{l.allCities}</option>
          {cities.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={l.searchPlaceholder}
          style={{ flex: '1 1 200px', padding: '0.5rem 0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem', backgroundColor: 'var(--color-bg-secondary)', fontSize: '1rem' }}
        />
      </div>

      <div style={{ border: '1px solid var(--color-border)', borderRadius: '0.5rem', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 120px', backgroundColor: 'var(--color-bg-secondary)', borderBottom: '2px solid var(--color-border)', fontWeight: 600, fontSize: '0.85rem' }}>
          <div style={{ padding: '0.5rem 0.75rem' }}>{l.city}</div>
          <div style={{ padding: '0.5rem 0.75rem' }}>{l.district}</div>
          <div style={{ padding: '0.5rem 0.75rem', textAlign: 'center' }}>{l.postalCode}</div>
        </div>
        <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
          {filtered.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-secondary)' }}>{l.noResults}</div>
          ) : (
            filtered.map((d, i) => (
              <div key={`${d.city}-${d.district}-${i}`} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 120px', borderBottom: '1px solid var(--color-border)', alignItems: 'center' }}>
                <div style={{ padding: '0.5rem 0.75rem', fontSize: '0.9rem' }}>{d.city}</div>
                <div style={{ padding: '0.5rem 0.75rem', fontSize: '0.9rem' }}>{d.district}</div>
                <div style={{ padding: '0.5rem 0.75rem', textAlign: 'center' }}>
                  <button
                    onClick={() => handleCopy(d.code)}
                    title={l.clickToCopy}
                    style={{ background: 'none', border: '1px solid var(--color-border)', borderRadius: '0.25rem', padding: '0.25rem 0.75rem', cursor: 'pointer', fontWeight: 700, fontSize: '1rem', color: copiedCode === d.code + d.district ? 'var(--color-primary)' : 'inherit' }}
                  >
                    {copiedCode === d.code + d.district ? l.copied : d.code}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>共 {filtered.length} 筆資料</p>
    </div>
  )
}
