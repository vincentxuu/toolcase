'use client'
import { useState, useCallback, useMemo } from 'react'

interface EmojiSearchProps {
  labels?: {
    search: string
    searchPlaceholder: string
    recentlyUsed: string
    copied: string
    categories?: {
      smileys?: string
      people?: string
      animals?: string
      food?: string
      travel?: string
      activities?: string
      objects?: string
      symbols?: string
    }
  }
}

interface EmojiData {
  emoji: string
  name: string
  category: string
}

const EMOJI_DATA: EmojiData[] = [
  // Smileys (~50)
  { emoji: '\u{1F600}', name: 'grinning face', category: 'smileys' },
  { emoji: '\u{1F603}', name: 'grinning face with big eyes', category: 'smileys' },
  { emoji: '\u{1F604}', name: 'grinning face with smiling eyes', category: 'smileys' },
  { emoji: '\u{1F601}', name: 'beaming face with smiling eyes', category: 'smileys' },
  { emoji: '\u{1F606}', name: 'grinning squinting face', category: 'smileys' },
  { emoji: '\u{1F605}', name: 'grinning face with sweat', category: 'smileys' },
  { emoji: '\u{1F602}', name: 'face with tears of joy', category: 'smileys' },
  { emoji: '\u{1F923}', name: 'rolling on the floor laughing', category: 'smileys' },
  { emoji: '\u{1F62D}', name: 'loudly crying face', category: 'smileys' },
  { emoji: '\u{1F609}', name: 'winking face', category: 'smileys' },
  { emoji: '\u{1F60A}', name: 'smiling face with smiling eyes', category: 'smileys' },
  { emoji: '\u{1F607}', name: 'smiling face with halo', category: 'smileys' },
  { emoji: '\u{1F970}', name: 'smiling face with hearts', category: 'smileys' },
  { emoji: '\u{1F60D}', name: 'smiling face with heart-eyes', category: 'smileys' },
  { emoji: '\u{1F929}', name: 'star-struck', category: 'smileys' },
  { emoji: '\u{1F618}', name: 'face blowing a kiss', category: 'smileys' },
  { emoji: '\u{1F617}', name: 'kissing face', category: 'smileys' },
  { emoji: '\u{1F61A}', name: 'kissing face with closed eyes', category: 'smileys' },
  { emoji: '\u{1F60B}', name: 'face savoring food', category: 'smileys' },
  { emoji: '\u{1F61B}', name: 'face with tongue', category: 'smileys' },
  { emoji: '\u{1F61C}', name: 'winking face with tongue', category: 'smileys' },
  { emoji: '\u{1F92A}', name: 'zany face', category: 'smileys' },
  { emoji: '\u{1F61D}', name: 'squinting face with tongue', category: 'smileys' },
  { emoji: '\u{1F917}', name: 'hugging face', category: 'smileys' },
  { emoji: '\u{1F914}', name: 'thinking face', category: 'smileys' },
  { emoji: '\u{1F910}', name: 'zipper-mouth face', category: 'smileys' },
  { emoji: '\u{1F928}', name: 'face with raised eyebrow', category: 'smileys' },
  { emoji: '\u{1F610}', name: 'neutral face', category: 'smileys' },
  { emoji: '\u{1F611}', name: 'expressionless face', category: 'smileys' },
  { emoji: '\u{1F636}', name: 'face without mouth', category: 'smileys' },
  { emoji: '\u{1F60F}', name: 'smirking face', category: 'smileys' },
  { emoji: '\u{1F612}', name: 'unamused face', category: 'smileys' },
  { emoji: '\u{1F644}', name: 'face with rolling eyes', category: 'smileys' },
  { emoji: '\u{1F62C}', name: 'grimacing face', category: 'smileys' },
  { emoji: '\u{1F624}', name: 'face with steam from nose', category: 'smileys' },
  { emoji: '\u{1F620}', name: 'angry face', category: 'smileys' },
  { emoji: '\u{1F621}', name: 'pouting face', category: 'smileys' },
  { emoji: '\u{1F92C}', name: 'face with symbols on mouth', category: 'smileys' },
  { emoji: '\u{1F622}', name: 'crying face', category: 'smileys' },
  { emoji: '\u{1F625}', name: 'sad but relieved face', category: 'smileys' },
  { emoji: '\u{1F631}', name: 'face screaming in fear', category: 'smileys' },
  { emoji: '\u{1F628}', name: 'fearful face', category: 'smileys' },
  { emoji: '\u{1F633}', name: 'flushed face', category: 'smileys' },
  { emoji: '\u{1F97A}', name: 'pleading face', category: 'smileys' },
  { emoji: '\u{1F634}', name: 'sleeping face', category: 'smileys' },
  { emoji: '\u{1F60E}', name: 'smiling face with sunglasses', category: 'smileys' },
  { emoji: '\u{1F913}', name: 'nerd face', category: 'smileys' },
  { emoji: '\u{1F973}', name: 'partying face', category: 'smileys' },
  { emoji: '\u{1F975}', name: 'hot face', category: 'smileys' },
  { emoji: '\u{1F976}', name: 'cold face', category: 'smileys' },
  { emoji: '\u{1F92E}', name: 'vomiting face', category: 'smileys' },
  { emoji: '\u{1F92F}', name: 'exploding head', category: 'smileys' },

  // People (~40)
  { emoji: '\u{1F44B}', name: 'waving hand', category: 'people' },
  { emoji: '\u{1F91A}', name: 'raised back of hand', category: 'people' },
  { emoji: '\u{270B}', name: 'raised hand', category: 'people' },
  { emoji: '\u{1F596}', name: 'vulcan salute', category: 'people' },
  { emoji: '\u{1F44C}', name: 'OK hand', category: 'people' },
  { emoji: '\u{1F90F}', name: 'pinching hand', category: 'people' },
  { emoji: '\u{270C}\u{FE0F}', name: 'victory hand', category: 'people' },
  { emoji: '\u{1F91E}', name: 'crossed fingers', category: 'people' },
  { emoji: '\u{1F918}', name: 'love-you gesture', category: 'people' },
  { emoji: '\u{1F919}', name: 'call me hand', category: 'people' },
  { emoji: '\u{1F448}', name: 'backhand index pointing left', category: 'people' },
  { emoji: '\u{1F449}', name: 'backhand index pointing right', category: 'people' },
  { emoji: '\u{1F446}', name: 'backhand index pointing up', category: 'people' },
  { emoji: '\u{1F447}', name: 'backhand index pointing down', category: 'people' },
  { emoji: '\u{261D}\u{FE0F}', name: 'index pointing up', category: 'people' },
  { emoji: '\u{1F44D}', name: 'thumbs up', category: 'people' },
  { emoji: '\u{1F44E}', name: 'thumbs down', category: 'people' },
  { emoji: '\u{270A}', name: 'raised fist', category: 'people' },
  { emoji: '\u{1F44A}', name: 'oncoming fist', category: 'people' },
  { emoji: '\u{1F91B}', name: 'left-facing fist', category: 'people' },
  { emoji: '\u{1F91C}', name: 'right-facing fist', category: 'people' },
  { emoji: '\u{1F44F}', name: 'clapping hands', category: 'people' },
  { emoji: '\u{1F64C}', name: 'raising hands', category: 'people' },
  { emoji: '\u{1F450}', name: 'open hands', category: 'people' },
  { emoji: '\u{1F932}', name: 'palms up together', category: 'people' },
  { emoji: '\u{1F91D}', name: 'handshake', category: 'people' },
  { emoji: '\u{1F64F}', name: 'folded hands', category: 'people' },
  { emoji: '\u{1F485}', name: 'nail polish', category: 'people' },
  { emoji: '\u{1F933}', name: 'selfie', category: 'people' },
  { emoji: '\u{1F4AA}', name: 'flexed biceps', category: 'people' },
  { emoji: '\u{1F9B5}', name: 'leg', category: 'people' },
  { emoji: '\u{1F9B6}', name: 'foot', category: 'people' },
  { emoji: '\u{1F442}', name: 'ear', category: 'people' },
  { emoji: '\u{1F443}', name: 'nose', category: 'people' },
  { emoji: '\u{1F9E0}', name: 'brain', category: 'people' },
  { emoji: '\u{1F440}', name: 'eyes', category: 'people' },
  { emoji: '\u{1F476}', name: 'baby', category: 'people' },
  { emoji: '\u{1F467}', name: 'girl', category: 'people' },
  { emoji: '\u{1F466}', name: 'boy', category: 'people' },
  { emoji: '\u{1F469}', name: 'woman', category: 'people' },
  { emoji: '\u{1F468}', name: 'man', category: 'people' },
  { emoji: '\u{1F9D1}\u{200D}\u{1F4BB}', name: 'technologist', category: 'people' },
  { emoji: '\u{1F483}', name: 'woman dancing', category: 'people' },
  { emoji: '\u{1F57A}', name: 'man dancing', category: 'people' },

  // Animals (~38)
  { emoji: '\u{1F436}', name: 'dog face', category: 'animals' },
  { emoji: '\u{1F431}', name: 'cat face', category: 'animals' },
  { emoji: '\u{1F42D}', name: 'mouse face', category: 'animals' },
  { emoji: '\u{1F439}', name: 'hamster', category: 'animals' },
  { emoji: '\u{1F430}', name: 'rabbit face', category: 'animals' },
  { emoji: '\u{1F98A}', name: 'fox', category: 'animals' },
  { emoji: '\u{1F43B}', name: 'bear', category: 'animals' },
  { emoji: '\u{1F43C}', name: 'panda', category: 'animals' },
  { emoji: '\u{1F428}', name: 'koala', category: 'animals' },
  { emoji: '\u{1F42F}', name: 'tiger face', category: 'animals' },
  { emoji: '\u{1F981}', name: 'lion', category: 'animals' },
  { emoji: '\u{1F42E}', name: 'cow face', category: 'animals' },
  { emoji: '\u{1F437}', name: 'pig face', category: 'animals' },
  { emoji: '\u{1F438}', name: 'frog', category: 'animals' },
  { emoji: '\u{1F435}', name: 'monkey face', category: 'animals' },
  { emoji: '\u{1F648}', name: 'see-no-evil monkey', category: 'animals' },
  { emoji: '\u{1F649}', name: 'hear-no-evil monkey', category: 'animals' },
  { emoji: '\u{1F64A}', name: 'speak-no-evil monkey', category: 'animals' },
  { emoji: '\u{1F414}', name: 'chicken', category: 'animals' },
  { emoji: '\u{1F427}', name: 'penguin', category: 'animals' },
  { emoji: '\u{1F426}', name: 'bird', category: 'animals' },
  { emoji: '\u{1F985}', name: 'eagle', category: 'animals' },
  { emoji: '\u{1F99C}', name: 'parrot', category: 'animals' },
  { emoji: '\u{1F40A}', name: 'crocodile', category: 'animals' },
  { emoji: '\u{1F422}', name: 'turtle', category: 'animals' },
  { emoji: '\u{1F40D}', name: 'snake', category: 'animals' },
  { emoji: '\u{1F432}', name: 'dragon face', category: 'animals' },
  { emoji: '\u{1F995}', name: 'dinosaur', category: 'animals' },
  { emoji: '\u{1F433}', name: 'whale', category: 'animals' },
  { emoji: '\u{1F42C}', name: 'dolphin', category: 'animals' },
  { emoji: '\u{1F41F}', name: 'fish', category: 'animals' },
  { emoji: '\u{1F419}', name: 'octopus', category: 'animals' },
  { emoji: '\u{1F41A}', name: 'shell', category: 'animals' },
  { emoji: '\u{1F40C}', name: 'snail', category: 'animals' },
  { emoji: '\u{1F98B}', name: 'butterfly', category: 'animals' },
  { emoji: '\u{1F41D}', name: 'honeybee', category: 'animals' },
  { emoji: '\u{1F41E}', name: 'ladybug', category: 'animals' },
  { emoji: '\u{1F984}', name: 'unicorn', category: 'animals' },

  // Food (~42)
  { emoji: '\u{1F34E}', name: 'red apple', category: 'food' },
  { emoji: '\u{1F34A}', name: 'tangerine', category: 'food' },
  { emoji: '\u{1F34B}', name: 'lemon', category: 'food' },
  { emoji: '\u{1F34C}', name: 'banana', category: 'food' },
  { emoji: '\u{1F349}', name: 'watermelon', category: 'food' },
  { emoji: '\u{1F347}', name: 'grapes', category: 'food' },
  { emoji: '\u{1F353}', name: 'strawberry', category: 'food' },
  { emoji: '\u{1F352}', name: 'cherries', category: 'food' },
  { emoji: '\u{1F351}', name: 'peach', category: 'food' },
  { emoji: '\u{1F34D}', name: 'pineapple', category: 'food' },
  { emoji: '\u{1F96D}', name: 'mango', category: 'food' },
  { emoji: '\u{1F95D}', name: 'kiwi fruit', category: 'food' },
  { emoji: '\u{1F345}', name: 'tomato', category: 'food' },
  { emoji: '\u{1F955}', name: 'carrot', category: 'food' },
  { emoji: '\u{1F33D}', name: 'ear of corn', category: 'food' },
  { emoji: '\u{1F951}', name: 'avocado', category: 'food' },
  { emoji: '\u{1F96C}', name: 'leafy green', category: 'food' },
  { emoji: '\u{1F35E}', name: 'bread', category: 'food' },
  { emoji: '\u{1F950}', name: 'croissant', category: 'food' },
  { emoji: '\u{1F956}', name: 'baguette bread', category: 'food' },
  { emoji: '\u{1F968}', name: 'pretzel', category: 'food' },
  { emoji: '\u{1F9C0}', name: 'cheese wedge', category: 'food' },
  { emoji: '\u{1F354}', name: 'hamburger', category: 'food' },
  { emoji: '\u{1F355}', name: 'pizza', category: 'food' },
  { emoji: '\u{1F32D}', name: 'hot dog', category: 'food' },
  { emoji: '\u{1F32E}', name: 'taco', category: 'food' },
  { emoji: '\u{1F32F}', name: 'burrito', category: 'food' },
  { emoji: '\u{1F37F}', name: 'popcorn', category: 'food' },
  { emoji: '\u{1F35C}', name: 'steaming bowl', category: 'food' },
  { emoji: '\u{1F363}', name: 'sushi', category: 'food' },
  { emoji: '\u{1F35F}', name: 'french fries', category: 'food' },
  { emoji: '\u{1F357}', name: 'poultry leg', category: 'food' },
  { emoji: '\u{1F370}', name: 'shortcake', category: 'food' },
  { emoji: '\u{1F382}', name: 'birthday cake', category: 'food' },
  { emoji: '\u{1F36B}', name: 'chocolate bar', category: 'food' },
  { emoji: '\u{1F36D}', name: 'lollipop', category: 'food' },
  { emoji: '\u{1F369}', name: 'doughnut', category: 'food' },
  { emoji: '\u{1F36A}', name: 'cookie', category: 'food' },
  { emoji: '\u{2615}', name: 'hot beverage', category: 'food' },
  { emoji: '\u{1F375}', name: 'teacup without handle', category: 'food' },
  { emoji: '\u{1F37A}', name: 'beer mug', category: 'food' },
  { emoji: '\u{1F377}', name: 'wine glass', category: 'food' },
  { emoji: '\u{1F378}', name: 'cocktail glass', category: 'food' },
  { emoji: '\u{1F9CB}', name: 'bubble tea', category: 'food' },

  // Travel (~32)
  { emoji: '\u{1F30D}', name: 'globe europe-africa', category: 'travel' },
  { emoji: '\u{1F30E}', name: 'globe americas', category: 'travel' },
  { emoji: '\u{1F30F}', name: 'globe asia-australia', category: 'travel' },
  { emoji: '\u{1F30B}', name: 'volcano', category: 'travel' },
  { emoji: '\u{1F3D6}\u{FE0F}', name: 'beach with umbrella', category: 'travel' },
  { emoji: '\u{1F3DD}\u{FE0F}', name: 'desert island', category: 'travel' },
  { emoji: '\u{1F3D9}\u{FE0F}', name: 'cityscape', category: 'travel' },
  { emoji: '\u{1F305}', name: 'sunrise', category: 'travel' },
  { emoji: '\u{1F307}', name: 'sunset', category: 'travel' },
  { emoji: '\u{1F3E0}', name: 'house', category: 'travel' },
  { emoji: '\u{1F3E2}', name: 'office building', category: 'travel' },
  { emoji: '\u{1F3E5}', name: 'hospital', category: 'travel' },
  { emoji: '\u{1F3EB}', name: 'school', category: 'travel' },
  { emoji: '\u{1F3F0}', name: 'castle', category: 'travel' },
  { emoji: '\u{26EA}', name: 'church', category: 'travel' },
  { emoji: '\u{1F54C}', name: 'mosque', category: 'travel' },
  { emoji: '\u{2708}\u{FE0F}', name: 'airplane', category: 'travel' },
  { emoji: '\u{1F680}', name: 'rocket', category: 'travel' },
  { emoji: '\u{1F6F8}', name: 'flying saucer', category: 'travel' },
  { emoji: '\u{1F697}', name: 'automobile', category: 'travel' },
  { emoji: '\u{1F695}', name: 'taxi', category: 'travel' },
  { emoji: '\u{1F68C}', name: 'bus', category: 'travel' },
  { emoji: '\u{1F682}', name: 'locomotive', category: 'travel' },
  { emoji: '\u{1F6A2}', name: 'ship', category: 'travel' },
  { emoji: '\u{26F5}', name: 'sailboat', category: 'travel' },
  { emoji: '\u{1F6B2}', name: 'bicycle', category: 'travel' },
  { emoji: '\u{1F3A2}', name: 'roller coaster', category: 'travel' },
  { emoji: '\u{1F5FC}', name: 'Tokyo tower', category: 'travel' },
  { emoji: '\u{1F5FD}', name: 'Statue of Liberty', category: 'travel' },
  { emoji: '\u{26F0}\u{FE0F}', name: 'mountain', category: 'travel' },
  { emoji: '\u{1F5FA}\u{FE0F}', name: 'world map', category: 'travel' },
  { emoji: '\u{1F3DC}\u{FE0F}', name: 'desert', category: 'travel' },

  // Activities (~30)
  { emoji: '\u{26BD}', name: 'soccer ball', category: 'activities' },
  { emoji: '\u{1F3C0}', name: 'basketball', category: 'activities' },
  { emoji: '\u{1F3C8}', name: 'american football', category: 'activities' },
  { emoji: '\u{26BE}', name: 'baseball', category: 'activities' },
  { emoji: '\u{1F3BE}', name: 'tennis', category: 'activities' },
  { emoji: '\u{1F3D0}', name: 'volleyball', category: 'activities' },
  { emoji: '\u{1F3B1}', name: 'pool 8 ball', category: 'activities' },
  { emoji: '\u{1F3D3}', name: 'ping pong', category: 'activities' },
  { emoji: '\u{1F3B8}', name: 'guitar', category: 'activities' },
  { emoji: '\u{1F3B5}', name: 'musical note', category: 'activities' },
  { emoji: '\u{1F3B6}', name: 'musical notes', category: 'activities' },
  { emoji: '\u{1F3A4}', name: 'microphone', category: 'activities' },
  { emoji: '\u{1F3AC}', name: 'clapper board', category: 'activities' },
  { emoji: '\u{1F3AE}', name: 'video game', category: 'activities' },
  { emoji: '\u{1F3B2}', name: 'game die', category: 'activities' },
  { emoji: '\u{1F3AF}', name: 'direct hit', category: 'activities' },
  { emoji: '\u{1F3A8}', name: 'artist palette', category: 'activities' },
  { emoji: '\u{1F3AD}', name: 'performing arts', category: 'activities' },
  { emoji: '\u{1F3C6}', name: 'trophy', category: 'activities' },
  { emoji: '\u{1F3C5}', name: 'sports medal', category: 'activities' },
  { emoji: '\u{1F947}', name: 'first place medal', category: 'activities' },
  { emoji: '\u{1F948}', name: 'second place medal', category: 'activities' },
  { emoji: '\u{1F949}', name: 'third place medal', category: 'activities' },
  { emoji: '\u{1F3AA}', name: 'circus tent', category: 'activities' },
  { emoji: '\u{1F3A7}', name: 'headphone', category: 'activities' },
  { emoji: '\u{1F3B9}', name: 'musical keyboard', category: 'activities' },
  { emoji: '\u{1F941}', name: 'drum', category: 'activities' },
  { emoji: '\u{1F3CB}\u{FE0F}', name: 'person lifting weights', category: 'activities' },
  { emoji: '\u{1F3CA}', name: 'person swimming', category: 'activities' },
  { emoji: '\u{1F6B4}', name: 'person biking', category: 'activities' },

  // Objects (~38)
  { emoji: '\u{231A}', name: 'watch', category: 'objects' },
  { emoji: '\u{1F4F1}', name: 'mobile phone', category: 'objects' },
  { emoji: '\u{1F4BB}', name: 'laptop', category: 'objects' },
  { emoji: '\u{2328}\u{FE0F}', name: 'keyboard', category: 'objects' },
  { emoji: '\u{1F5A5}\u{FE0F}', name: 'desktop computer', category: 'objects' },
  { emoji: '\u{1F4F7}', name: 'camera', category: 'objects' },
  { emoji: '\u{1F4F9}', name: 'video camera', category: 'objects' },
  { emoji: '\u{1F4FA}', name: 'television', category: 'objects' },
  { emoji: '\u{1F4FB}', name: 'radio', category: 'objects' },
  { emoji: '\u{23F0}', name: 'alarm clock', category: 'objects' },
  { emoji: '\u{1F4A1}', name: 'light bulb', category: 'objects' },
  { emoji: '\u{1F50B}', name: 'battery', category: 'objects' },
  { emoji: '\u{1F50C}', name: 'electric plug', category: 'objects' },
  { emoji: '\u{1F4B0}', name: 'money bag', category: 'objects' },
  { emoji: '\u{1F4B3}', name: 'credit card', category: 'objects' },
  { emoji: '\u{1F48E}', name: 'gem stone', category: 'objects' },
  { emoji: '\u{1F4E6}', name: 'package', category: 'objects' },
  { emoji: '\u{1F4E7}', name: 'e-mail', category: 'objects' },
  { emoji: '\u{1F4DD}', name: 'memo', category: 'objects' },
  { emoji: '\u{270F}\u{FE0F}', name: 'pencil', category: 'objects' },
  { emoji: '\u{1F4DA}', name: 'books', category: 'objects' },
  { emoji: '\u{1F4D6}', name: 'open book', category: 'objects' },
  { emoji: '\u{1F4CB}', name: 'clipboard', category: 'objects' },
  { emoji: '\u{1F4CC}', name: 'pushpin', category: 'objects' },
  { emoji: '\u{1F4CE}', name: 'paperclip', category: 'objects' },
  { emoji: '\u{1F511}', name: 'key', category: 'objects' },
  { emoji: '\u{1F512}', name: 'locked', category: 'objects' },
  { emoji: '\u{1F513}', name: 'unlocked', category: 'objects' },
  { emoji: '\u{1F528}', name: 'hammer', category: 'objects' },
  { emoji: '\u{1F52C}', name: 'microscope', category: 'objects' },
  { emoji: '\u{1F52D}', name: 'telescope', category: 'objects' },
  { emoji: '\u{1F4E2}', name: 'loudspeaker', category: 'objects' },
  { emoji: '\u{1F514}', name: 'bell', category: 'objects' },
  { emoji: '\u{1F381}', name: 'wrapped gift', category: 'objects' },
  { emoji: '\u{1F388}', name: 'balloon', category: 'objects' },
  { emoji: '\u{1F389}', name: 'party popper', category: 'objects' },
  { emoji: '\u{1F38A}', name: 'confetti ball', category: 'objects' },
  { emoji: '\u{1F3A4}', name: 'microphone obj', category: 'objects' },

  // Symbols (~44)
  { emoji: '\u{2764}\u{FE0F}', name: 'red heart', category: 'symbols' },
  { emoji: '\u{1F9E1}', name: 'orange heart', category: 'symbols' },
  { emoji: '\u{1F49B}', name: 'yellow heart', category: 'symbols' },
  { emoji: '\u{1F49A}', name: 'green heart', category: 'symbols' },
  { emoji: '\u{1F499}', name: 'blue heart', category: 'symbols' },
  { emoji: '\u{1F49C}', name: 'purple heart', category: 'symbols' },
  { emoji: '\u{1F5A4}', name: 'black heart', category: 'symbols' },
  { emoji: '\u{1F90D}', name: 'white heart', category: 'symbols' },
  { emoji: '\u{1F90E}', name: 'brown heart', category: 'symbols' },
  { emoji: '\u{1F494}', name: 'broken heart', category: 'symbols' },
  { emoji: '\u{1F495}', name: 'two hearts', category: 'symbols' },
  { emoji: '\u{1F496}', name: 'sparkling heart', category: 'symbols' },
  { emoji: '\u{1F497}', name: 'growing heart', category: 'symbols' },
  { emoji: '\u{1F498}', name: 'heart with arrow', category: 'symbols' },
  { emoji: '\u{1F4AF}', name: 'hundred points', category: 'symbols' },
  { emoji: '\u{1F4A2}', name: 'anger symbol', category: 'symbols' },
  { emoji: '\u{1F4A5}', name: 'collision', category: 'symbols' },
  { emoji: '\u{1F4AB}', name: 'dizzy', category: 'symbols' },
  { emoji: '\u{1F4AC}', name: 'speech balloon', category: 'symbols' },
  { emoji: '\u{274C}', name: 'cross mark', category: 'symbols' },
  { emoji: '\u{2705}', name: 'check mark button', category: 'symbols' },
  { emoji: '\u{2714}\u{FE0F}', name: 'check mark', category: 'symbols' },
  { emoji: '\u{2B50}', name: 'star', category: 'symbols' },
  { emoji: '\u{1F31F}', name: 'glowing star', category: 'symbols' },
  { emoji: '\u{1F4A4}', name: 'zzz', category: 'symbols' },
  { emoji: '\u{1F525}', name: 'fire', category: 'symbols' },
  { emoji: '\u{2728}', name: 'sparkles', category: 'symbols' },
  { emoji: '\u{1F4A3}', name: 'bomb', category: 'symbols' },
  { emoji: '\u{26A0}\u{FE0F}', name: 'warning', category: 'symbols' },
  { emoji: '\u{267B}\u{FE0F}', name: 'recycling symbol', category: 'symbols' },
  { emoji: '\u{2699}\u{FE0F}', name: 'gear', category: 'symbols' },
  { emoji: '\u{26A1}', name: 'high voltage', category: 'symbols' },
  { emoji: '\u{27A1}\u{FE0F}', name: 'right arrow', category: 'symbols' },
  { emoji: '\u{2B05}\u{FE0F}', name: 'left arrow', category: 'symbols' },
  { emoji: '\u{2B06}\u{FE0F}', name: 'up arrow', category: 'symbols' },
  { emoji: '\u{2B07}\u{FE0F}', name: 'down arrow', category: 'symbols' },
  { emoji: '\u{1F504}', name: 'counterclockwise arrows', category: 'symbols' },
  { emoji: '\u{2795}', name: 'plus', category: 'symbols' },
  { emoji: '\u{2796}', name: 'minus', category: 'symbols' },
  { emoji: '\u{2797}', name: 'divide', category: 'symbols' },
  { emoji: '\u{267E}\u{FE0F}', name: 'infinity', category: 'symbols' },
  { emoji: '\u{1F6A9}', name: 'triangular flag', category: 'symbols' },
  { emoji: '\u{1F3F4}', name: 'black flag', category: 'symbols' },
  { emoji: '\u{1F3F3}\u{FE0F}', name: 'white flag', category: 'symbols' },
]

const CATEGORIES = [
  { key: 'smileys', icon: '\u{1F600}' },
  { key: 'people', icon: '\u{1F44B}' },
  { key: 'animals', icon: '\u{1F436}' },
  { key: 'food', icon: '\u{1F34E}' },
  { key: 'travel', icon: '\u{2708}\u{FE0F}' },
  { key: 'activities', icon: '\u{26BD}' },
  { key: 'objects', icon: '\u{1F4BB}' },
  { key: 'symbols', icon: '\u{2764}\u{FE0F}' },
] as const

export default function EmojiSearch({ labels }: EmojiSearchProps) {
  const l = {
    search: labels?.search ?? 'Search',
    searchPlaceholder: labels?.searchPlaceholder ?? 'Search emojis...',
    recentlyUsed: labels?.recentlyUsed ?? 'Recently Used',
    copied: labels?.copied ?? 'Copied!',
    categories: {
      smileys: labels?.categories?.smileys ?? 'Smileys',
      people: labels?.categories?.people ?? 'People',
      animals: labels?.categories?.animals ?? 'Animals',
      food: labels?.categories?.food ?? 'Food',
      travel: labels?.categories?.travel ?? 'Travel',
      activities: labels?.categories?.activities ?? 'Activities',
      objects: labels?.categories?.objects ?? 'Objects',
      symbols: labels?.categories?.symbols ?? 'Symbols',
    },
  }

  const categoryLabels: Record<string, string> = l.categories

  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('smileys')
  const [recentlyUsed, setRecentlyUsed] = useState<EmojiData[]>([])
  const [toast, setToast] = useState<string | null>(null)

  const filteredEmojis = useMemo(() => {
    if (search.trim()) {
      return EMOJI_DATA.filter((e) =>
        e.name.toLowerCase().includes(search.toLowerCase())
      )
    }
    return EMOJI_DATA.filter((e) => e.category === activeCategory)
  }, [search, activeCategory])

  const handleEmojiClick = useCallback(async (emojiData: EmojiData) => {
    try {
      await navigator.clipboard.writeText(emojiData.emoji)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = emojiData.emoji
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }

    setRecentlyUsed((prev) => {
      const filtered = prev.filter((e) => e.emoji !== emojiData.emoji)
      return [emojiData, ...filtered].slice(0, 20)
    })

    setToast(emojiData.emoji)
    setTimeout(() => setToast(null), 1500)
  }, [])

  const emojiButtonStyle: React.CSSProperties = {
    fontSize: '1.75rem',
    padding: '0.5rem',
    borderRadius: '0.5rem',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '3rem',
    height: '3rem',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative' }}>
      {/* Toast notification */}
      {toast && (
        <div style={{
          position: 'fixed',
          top: '1.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '0.5rem 1rem',
          borderRadius: '0.5rem',
          backgroundColor: 'var(--color-primary)',
          color: 'white',
          fontSize: '0.875rem',
          fontWeight: 500,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}>
          <span style={{ fontSize: '1.25rem' }}>{toast}</span>
          {l.copied}
        </div>
      )}

      {/* Search input */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={l.searchPlaceholder}
        style={{
          width: '100%',
          padding: '0.75rem 1rem',
          borderRadius: '0.5rem',
          border: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-bg-secondary)',
          color: 'var(--color-text)',
          fontSize: '0.875rem',
          outline: 'none',
          boxSizing: 'border-box',
        }}
      />

      {/* Recently used */}
      {recentlyUsed.length > 0 && !search && (
        <div>
          <div style={{
            fontSize: '0.8rem',
            fontWeight: 600,
            color: 'var(--color-text-secondary)',
            marginBottom: '0.5rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            {l.recentlyUsed}
          </div>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.25rem',
            padding: '0.5rem',
            borderRadius: '0.5rem',
            backgroundColor: 'var(--color-bg-secondary)',
            border: '1px solid var(--color-border)',
          }}>
            {recentlyUsed.map((e, i) => (
              <button
                key={`recent-${i}`}
                onClick={() => handleEmojiClick(e)}
                title={e.name}
                style={emojiButtonStyle}
              >
                {e.emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Category tabs */}
      {!search && (
        <div style={{
          display: 'flex',
          gap: '0.25rem',
          overflowX: 'auto',
          padding: '0.25rem',
          borderRadius: '0.5rem',
          backgroundColor: 'var(--color-bg-secondary)',
          border: '1px solid var(--color-border)',
        }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              title={categoryLabels[cat.key]}
              style={{
                flex: '1 1 0',
                padding: '0.5rem 0.25rem',
                borderRadius: '0.375rem',
                border: 'none',
                backgroundColor: activeCategory === cat.key ? 'var(--color-primary)' : 'transparent',
                cursor: 'pointer',
                fontSize: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.125rem',
                minWidth: '3rem',
              }}
            >
              <span>{cat.icon}</span>
              <span style={{
                fontSize: '0.6rem',
                color: activeCategory === cat.key ? 'white' : 'var(--color-text-secondary)',
                fontWeight: 500,
                whiteSpace: 'nowrap',
              }}>
                {categoryLabels[cat.key]}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Emoji grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(3rem, 1fr))',
        gap: '0.25rem',
        maxHeight: '400px',
        overflowY: 'auto',
        padding: '0.5rem',
        borderRadius: '0.5rem',
        backgroundColor: 'var(--color-bg-secondary)',
        border: '1px solid var(--color-border)',
      }}>
        {filteredEmojis.map((e, i) => (
          <button
            key={`${e.category}-${i}`}
            onClick={() => handleEmojiClick(e)}
            title={e.name}
            style={emojiButtonStyle}
          >
            {e.emoji}
          </button>
        ))}
        {filteredEmojis.length === 0 && (
          <div style={{
            gridColumn: '1 / -1',
            padding: '2rem',
            textAlign: 'center',
            color: 'var(--color-text-secondary)',
            fontSize: '0.875rem',
          }}>
            No emojis found
          </div>
        )}
      </div>
    </div>
  )
}
