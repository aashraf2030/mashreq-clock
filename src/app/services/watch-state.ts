import { Injectable, signal } from '@angular/core';

export interface Watch {
  id: string;
  name: string;
  image: string;
  colorLabel: string;
  accentColor: string;
  subtitle: string;
  description: string;
  frameMaterial: string;
}

@Injectable({
  providedIn: 'root',
})
export class WatchStateService {
  public readonly watches: Watch[] = [
    {
      id: 'silver',
      name: 'المشرق سيلفر',
      image: 'imgs/watch_round_silver-X5UnnnHu9f4D5bZzyhKDX5.webp',
      colorLabel: 'فضي أنيق',
      accentColor: '#94a3b8',
      subtitle: 'لمعان فضي عصري',
      description: 'ساعة ذكية فاخرة بلمعان فضي ناصع، تدمج بين البساطة العصرية واللمسات الجمالية مع دعم الدفع اللاتلامسي.',
      frameMaterial: 'إطار فضي معدني مصقول'
    },
    {
      id: 'gold',
      name: 'المشرق جولد',
      image: 'imgs/watch_round_gold-GFnr2PRAKMRYKYLAywQyYM.webp',
      colorLabel: 'ذهبي فاخر',
      accentColor: '#ca8a04',
      subtitle: 'فخامة ذهبية متألقة',
      description: 'ساعة ذكية فاخرة مطلية ببريق ذهبي ملكي، تعكس الفخامة والتميز في معصمك مع دعم الدفع اللاتلامسي.',
      frameMaterial: 'إطار ذهبي معدني فاخر'
    },
    {
      id: 'black',
      name: 'المشرق بلاك',
      image: 'imgs/watch_round_black-kHtc2MVWUXPM5RMyDt3kVv.webp',
      colorLabel: 'أسود كلاسيكي',
      accentColor: '#1f2937',
      subtitle: 'أناقة كلاسيكية غامضة',
      description: 'ساعة ذكية فاخرة بإطار أسود داكن، تجسد الأناقة الكلاسيكية والقوة العملية مع دعم الدفع اللاتلامسي.',
      frameMaterial: 'إطار معدني أسود مطلي'
    },
    {
      id: 'red',
      name: 'المشرق ريد',
      image: 'imgs/watch_round_red-iLDyT8oHMCegniVtSkTmsa.webp',
      colorLabel: 'أحمر جريء',
      accentColor: '#dc2626',
      subtitle: 'حيوية حمراء جريئة',
      description: 'ساعة ذكية فاخرة بلون أحمر ناصع وجريء، تعكس الشغف والنشاط الرياضي المتكامل مع دعم الدفع اللاتلامسي.',
      frameMaterial: 'إطار أحمر معدني جريء'
    },
    {
      id: 'blue',
      name: 'المشرق بلو',
      image: 'imgs/watch_round_blue-oKJENGiLeVFf8fKs7VHejP.webp',
      colorLabel: 'أزرق ملكي',
      accentColor: '#2563eb',
      subtitle: 'أصالة زرقاء ملكية',
      description: 'ساعة ذكية فاخرة بلون أزرق عميق، تمنحك إطلالة ملكية هادئة وجاذبية فريدة مع دعم الدفع اللاتلامسي.',
      frameMaterial: 'إطار أزرق معدني ملكي'
    },
    {
      id: 'orange',
      name: 'المشرق أورانج',
      image: 'imgs/watch_round_orange-dGLeVRQCuaYU75MHBtUwo6.webp',
      colorLabel: 'برتقالي مشرق',
      accentColor: '#ea580c',
      subtitle: 'إشراقة برتقالية مميزة',
      description: 'ساعة ذكية فاخرة بإطار برتقالي مشرق، تجمع بين الحيوية والتقنية الحديثة مع دعم الدفع اللاتلامسي.',
      frameMaterial: 'إطار برتقالي معدني'
    },
    {
      id: 'purple',
      name: 'المشرق بيربل',
      image: 'imgs/watch_round_purple-Kgk4jdyc2mrZXTqvDKcQFU.webp',
      colorLabel: 'بنفسجي غامق',
      accentColor: '#7c3aed',
      subtitle: 'غموض بنفسجي ساحر',
      description: 'ساعة ذكية فاخرة بلون بنفسجي غامق ساحر، تميزك في جميع المناسبات الرسمية واليومية مع دعم الدفع اللاتلامسي.',
      frameMaterial: 'إطار بنفسجي معدني داكن'
    },
    {
      id: 'pink',
      name: 'المشرق بينك',
      image: 'imgs/watch_round_pink-WR69t57tSvhMaR3waHe2EU.webp',
      colorLabel: 'وردي ناعم',
      accentColor: '#db2777',
      subtitle: 'رقة وردية ناعمة',
      description: 'ساعة ذكية فاخرة بلون وردي ناعم وجميل، مصممة خصيصاً لأصحاب الذوق الرقيق والهادئ مع دعم الدفع اللاتلامسي.',
      frameMaterial: 'إطار وردي معدني ناعم'
    },
    {
      id: 'green',
      name: 'المشرق جرين',
      image: 'imgs/watch_round_green-5tz9H8WDitg47kCvFKsa9Z.webp',
      colorLabel: 'أخضر عسكري',
      accentColor: '#16a34a',
      subtitle: 'صلابة عسكرية مغامرة',
      description: 'ساعة ذكية فاخرة بلون أخضر عسكري صلب، تتحمل أصعب الظروف والمغامرات الخارجية مع دعم الدفع اللاتلامسي.',
      frameMaterial: 'إطار أخضر معدني متين'
    },
    {
      id: 'rosegold',
      name: 'المشرق روز جولد',
      image: 'imgs/watch_round_rosegold-23EEP3GyeDxR9YCVHy5Vxy.webp',
      colorLabel: 'روز جولد',
      accentColor: '#fda4af',
      subtitle: 'جمال روز جولد متفرد',
      description: 'ساعة ذكية فاخرة بلون الروز جولد المتلألئ، تعبر عن الرقي واللمسة العصرية الفائقة مع دعم الدفع اللاتلامسي.',
      frameMaterial: 'إطار روز جولد معدني'
    },
    {
      id: 'brown',
      name: 'المشرق براون',
      image: 'imgs/watch_round_brown-NDc9bQn867tdpbVeB67UK6.webp',
      colorLabel: 'بني جلد',
      accentColor: '#78350f',
      subtitle: 'جاذبية بنية كلاسيكية',
      description: 'ساعة ذكية فاخرة بسوار بني جلدي عتيق، تجمع بين طابع الساعات الكلاسيكية والتقنية الذكية مع دعم الدفع اللاتلامسي.',
      frameMaterial: 'إطار بني معدني مع سوار جلدي'
    },
    {
      id: 'white',
      name: 'المشرق وايت',
      image: 'imgs/watch_round_white-QpLqxaCgJArRbYdZaJkKxB.webp',
      colorLabel: 'أبيض نقي',
      accentColor: '#f8fafc',
      subtitle: 'نقاء أبيض ناصع',
      description: 'ساعة ذكية فاخرة بلون أبيض ناصع ونقي، تعبر عن البساطة والتألق في صورتها المثالية مع دعم الدفع اللاتلامسي.',
      frameMaterial: 'إطار أبيض معدني ناصع'
    },
    {
      id: 'teal',
      name: 'المشرق تيل',
      image: 'imgs/watch_round_teal-ZZKpzX2EirgVAvJDAHqZEa.webp',
      colorLabel: 'تركواز',
      accentColor: '#0d9488',
      subtitle: 'انتعاش تركواز متلألئ',
      description: 'ساعة ذكية فاخرة بلون تركواز منعش وجذاب، تضفي بهجة صيفية مميزة على مظهرك اليومي مع دعم الدفع اللاتلامسي.',
      frameMaterial: 'إطار تركواز معدني مميز'
    }
  ];

  // Shared state: dynamic selection initialized to Orange watch
  public readonly selectedWatch = signal<Watch>(this.watches[5]);

  // Shared user info signals for checkout form step
  public readonly fullName = signal<string>('');
  public readonly nationalId = signal<string>('');
  public readonly phoneNumber = signal<string>('');
  public readonly currentRequestId = signal<string>('');

  public selectWatch(watch: Watch): void {
    this.selectedWatch.set(watch);
  }
}
