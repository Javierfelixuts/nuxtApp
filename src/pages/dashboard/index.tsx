const people = [
  {
    name: 'Jane Cooper',
    title: 'Regional Paradigm Technician',
    department: 'Optimization',
    role: 'Admin',
    email: 'jane.cooper@example.com',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
];
import endPoints from '@services/api';
import useFetch from '@hooks/useFetch';
import { Products } from '@customTypes/Products';
import { Category } from '@customTypes/Category';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { Chart } from '@common/Chart';
const PRODUCT_LIMIT = 20;
const PRODUCT_OFFSET = 20;
export default function Dashboard() {
  const products = useFetch(endPoints.products.getProducts(PRODUCT_LIMIT, PRODUCT_OFFSET));
  console.log('producs;', products);
  const categoryNames = products?.map((product: Products) => product.category);
  const categoryCount = categoryNames?.map((category: Category) => category.name);

  const countOccurrences = (arr: any) => arr.reduce((prev: any, curr: any) => ((prev[curr] = ++prev[curr] || 1), prev), {});
  console.log('countOccurrences(categoryCount); ', countOccurrences(categoryCount));
  const data = {
    datasets: [
      {
        label: 'Categories',
        data: countOccurrences(categoryCount),
        borderWidth: 2,
        backgroundColor: ['#ffbb11', '#c0c0c0', '#50AF95', '#f3ba2f', '#2a71d0'],
      },
    ],
  };
  return (
    <>
      <Chart chartData={data} />
    </>
  );
}
