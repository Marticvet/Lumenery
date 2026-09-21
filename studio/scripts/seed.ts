import {createReadStream} from "node:fs";
import {resolve} from "node:path";
import {getCliClient} from "sanity/cli";

const token = process.env.SANITY_AUTH_TOKEN;
if (!token) throw new Error("Missing SANITY_AUTH_TOKEN. Add an Editor token to studio/.env.local before importing content.");
const client = getCliClient({apiVersion: "2026-09-01"}).withConfig({token});
const publicDir = resolve(process.cwd(), "../public/lumynery");

const text = (de: string, en: string, bg: string) => ({_type: "localizedString", de, en, bg});
const longText = (de: string, en: string, bg: string) => ({_type: "localizedText", de, en, bg});
const reference = (_ref: string) => ({_type: "reference", _ref, _key: _ref.replace(/[^a-z0-9]/gi, "")});
const list = (items: Array<[string, string, string]>) => items.map((item, index) => ({_key: `item${index + 1}`, ...text(...item)}));

async function upload(filename: string) {
  return client.assets.upload("image", createReadStream(resolve(publicDir, filename)), {filename});
}

async function run() {
  const [menuCover, menuHero, menuDetail, inviteCover, tableCover] = await Promise.all([
    upload("product-menu.jpg"), upload("menu-hero.jpg"), upload("menu-detail.jpg"), upload("product-invite.jpg"), upload("product-table.jpg"),
  ]);
  const image = (assetId: string, alt: ReturnType<typeof text>, key?: string) => ({
    ...(key ? {_key: key} : {}), _type: "galleryImage", image: {_type: "image", asset: {_type: "reference", _ref: assetId}}, alt,
  });

  const categories = [
    {_id: "category.wedding", _type: "category", title: text("Hochzeit", "Wedding", "Сватба"), slug: {_type: "slug", current: "hochzeit"}, order: 10},
    {_id: "category.birth", _type: "category", title: text("Geburt + Taufe", "Birth + christening", "Раждане + кръщене"), slug: {_type: "slug", current: "geburt-taufe"}, order: 20},
    {_id: "category.invitations", _type: "category", title: text("Einladungen", "Invitations", "Покани"), slug: {_type: "slug", current: "einladungen"}, order: 30},
    {_id: "category.gifts", _type: "category", title: text("Geschenksets", "Gift sets", "Подаръчни комплекти"), slug: {_type: "slug", current: "geschenksets"}, order: 40},
  ];

  const products = [
    {
      _id: "product.menuekarten", _type: "product", active: true, featured: true, order: 10,
      title: text("Menükarten – individuell", "Menu cards — personalised", "Менюта — индивидуален дизайн"), slug: {_type: "slug", current: "menuekarten"},
      shortDescription: longText("Individuell gestaltet für eure Feier.", "Individually designed for your celebration.", "Индивидуален дизайн за вашия празник."),
      description: longText("Perfekt abgestimmt auf eure Hochzeit, Taufe oder Feier. Jede Karte wird nach euren Wünschen gestaltet.", "Perfectly matched to your wedding, christening or celebration. Every card is designed around your wishes.", "Съобразени с вашата сватба, кръщене или празник. Всяка карта се създава според вашите желания."),
      price: 6.99, startingAt: true, priceUnit: "piece", categories: [reference("category.wedding")],
      coverImage: image(menuCover._id, text("Individuelle Lumynery Menükarte", "Personalised Lumynery menu card", "Индивидуално меню от Lumynery")),
      gallery: [
        image(menuHero._id, text("Menükarte in einer festlichen Tischdekoration", "Menu card in a festive table setting", "Меню в празнична декорация"), "hero"),
        image(menuDetail._id, text("Detailansicht der Menükarte", "Menu card detail", "Детайл на менюто"), "detail"),
      ],
      features: list([["Individuelles Design", "Personalised design", "Индивидуален дизайн"], ["Hochwertiger Druck", "Premium printing", "Висококачествен печат"], ["Persönliche Beratung", "Personal guidance", "Лична консултация"], ["Schnelle Bearbeitung", "Fast turnaround", "Бърза изработка"]]),
      included: list([["Persönliches Design", "Personal design", "Персонален дизайн"], ["Unbegrenzte kleine Änderungen", "Unlimited small revisions", "Неограничени малки корекции"], ["Druckvorbereitung", "Print preparation", "Подготовка за печат"], ["Hochwertige Druckqualität", "Premium print quality", "Висококачествен печат"]]),
    },
    {
      _id: "product.einladungen", _type: "product", active: true, featured: false, order: 20,
      title: text("Einladungen", "Invitations", "Покани"), slug: {_type: "slug", current: "einladungen"},
      shortDescription: longText("Persönliche Einladungen für besondere Anlässe.", "Personal invitations for special occasions.", "Персонални покани за специални поводи."),
      description: longText("Einladungen, die Stil, Farben und Geschichte eures besonderen Tages widerspiegeln.", "Invitations that reflect the style, colours and story of your special day.", "Покани, които отразяват стила, цветовете и историята на вашия специален ден."),
      price: 3.5, startingAt: false, priceUnit: "piece", categories: [reference("category.wedding"), reference("category.birth"), reference("category.invitations")],
      coverImage: image(inviteCover._id, text("Florale Einladungskarte", "Floral invitation card", "Покана с флорални мотиви")), gallery: [],
      features: list([["Individuelles Design", "Personalised design", "Индивидуален дизайн"], ["Passend zu eurem Anlass", "Matched to your occasion", "Съобразени с вашия повод"]]), included: [],
    },
    {
      _id: "product.tischdeko", _type: "product", active: true, featured: false, order: 30,
      title: text("Tischdeko", "Table decorations", "Декорация за маса"), slug: {_type: "slug", current: "tischdeko"},
      shortDescription: longText("Stimmige Details für eure Festtafel.", "Coordinated details for your celebration table.", "Хармонични детайли за вашата празнична маса."),
      description: longText("Tischnummern, Namenskarten und weitere Papeterie, harmonisch auf euer Event abgestimmt.", "Table numbers, place cards and more stationery, coordinated with your event.", "Номера за маси, картички с имена и друга папетерия, съобразени с вашето събитие."),
      price: 3.5, startingAt: false, priceUnit: "piece", categories: [reference("category.wedding")],
      coverImage: image(tableCover._id, text("Tischnummer in einer eleganten Dekoration", "Table number in an elegant setting", "Номер за маса в елегантна декорация")), gallery: [],
      features: list([["Passende Serie", "Coordinated collection", "Съчетана колекция"], ["Persönlich abgestimmt", "Personally tailored", "Персонално изработена"]]), included: [],
    },
  ];

  let transaction = client.transaction();
  for (const document of [...categories, ...products]) transaction = transaction.createOrReplace(document);
  await transaction.commit();
  console.log(`Imported ${categories.length} categories and ${products.length} products into ${client.config().dataset}.`);
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
