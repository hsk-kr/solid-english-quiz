import BaseTemplate from "../../components/templates/BaseTemplate";

const NotFound = () => {
  return (
    <BaseTemplate>
      <div
        class="mx-auto flex flex-col w-fit text-center gap-y-4"
        style={{ "padding-top": "20%" }}
      >
        <h1 class="text-8xl">404</h1>
        <span class="text-3xl">Page Not Found</span>
        <a href="/" class="text-lg text-gray-800">
          GO HOME
        </a>
      </div>
    </BaseTemplate>
  );
};

export default NotFound;
