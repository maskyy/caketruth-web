import { ChangeEvent, FC, useState } from "react";
import { CgArrowLeft } from "react-icons/cg";
import { Link, useParams } from "react-router-dom";
import { products } from "../../../testData";
import { Header } from "../../header/Header";
import { PageLayout } from "../../layouts/PageLayout";

const titles: string[][] = [
  ["calories", "Калориийность", "ккал"],
  ["proteins", "Белки", "г"],
  ["fats", "Жиры", "г"],
  ["carbs", "Углеводы", "г"],
  ["ethanol", "Этанол", "г"],
  ["net_grams", "Масса нетто", "г"],
  ["drained_grams", "Масса основного продукта", "г"],
  ["product_category", "Категория"],
];

const dependsOnMass = ["calories", "proteins", "fats", "carbs", "ethanol"];

export const ViewProduct: FC = () => {
  const [mass, setMass] = useState(100);

  const handleMassChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setMass(+ev.target.value);
  };

  const productId = Number(useParams().productId);
  const product = products.find(p => p.id === productId)!;
  const productEntries = Object.entries(product);

  const renderedData = productEntries.map(entry => {
    let translation = titles.find(t => t[0] === entry[0]);
    if (translation === undefined) {
      return null;
    }
    const title = translation[1];
    let value: string|number = entry[1];
    if (dependsOnMass.indexOf(entry[0]) !== -1) {
      value = +value;
      value = (value * mass / 100).toFixed(2);
    }
    const suffix = translation[2] ?? "";

    return (
      <tr key={title} className="border-y border-gray-300">
        <td>{title}</td>
        <td>{value} {suffix}</td>
      </tr>
    );
  });

  return (
    <PageLayout
      title="Продукт"
      header={
        <Header icon={false}>
          <Link to="/products"><CgArrowLeft size={24} /></Link>
          <h1>
            {product.product_brand} {product.name}
          </h1>
        </Header>
      }
      footer={false}
    >
      <form className="flex flex-col items-center">
        <label>Масса</label>
        <input type="number" value={mass} onChange={handleMassChange} />
        <button type="submit">Добавить в дневник</button>
      </form>
      <div className="flex flex-col items-center">
        <h2><strong>Информация о продукте</strong></h2>
        <table className="mx-2 text-center">
          <tbody>
            {renderedData}
          </tbody>
        </table>
      </div>
    </PageLayout>
  );
}
