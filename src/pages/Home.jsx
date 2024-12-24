import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from "../config/motion";
import state from "../store";
import { CustomButton } from "../components/index";

const Home = () => {
  const snap = useSnapshot(state);
  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section className="home" {...slideAnimation("left")}>
          {/* Header */}
          <motion.header {...slideAnimation("down")}>
            <img
              src="./threejs.png"
              alt="logo"
              className="h-32 w-32 object-contain"
            />
          </motion.header>

          {/* Content */}
          <motion.div className="head-content" {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className="head-text">
                ФАБРИКА
                <br className="xl:block hidden" />
              </h1>
              <h1 className="headgrad-text">
                ГЕНЕРАТИВНОГО <br className="xl:block hidden" />
              </h1>
              <h1 className="head-text">
                ДИЗАЙНА.
                <br className="xl:block hidden" />{" "}
                <br className="xl:block hidden" />
              </h1>
              <br />
            </motion.div>

            <motion.div
              {...headContentAnimation}
              className="flex flex-col gap-5"
            >
              <p className="max-w-md font-normal text-gray-800 text-base">
                Создайте свой уникальный мерч с помощью нашего совершенно нового
                3D инструмента кастомизации.{" "}
                <strong>Дайте волю своему воображению</strong>{" "}
              </p>
              <CustomButton
                title="Начать"
                handleClick={() => (state.intro = false)}
                customStyles="w-fit px-20 py-3.5 font-bold text-sm custom-button"
              />
            </motion.div>
          </motion.div>
          <motion.div className="flex items-center justify-left bottom-0 w-full p-4">
            <a
              href="https://www.fasie.ru/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <img
                src="./fasie-logo.png"
                alt="Фонд Содействия Инновациям"
                className="h-16 w-16 object-contain mr-4"
              />
              <p className="text-gray-800 text-base font-light">
                проект поддержан Фондом Содействия Инновациям
              </p>
            </a>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Home;
