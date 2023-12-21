// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
import GetHeader from '../../components/global_elm';
import Script from 'next/script'
// The Page
export default function Home() {
    return (
        <>
            <GetHeader />
            <div id="dragging_items"></div>
            <div id="container">
                <div id="gameboard">
                    <div id="set1" className="card_set"></div>
                    <div id="set2" className="card_set"></div>
                    <div id="set3" className="card_set"></div>
                    <div id="set4" className="card_set"></div>
                    <div id="set5" className="card_set"></div>
                    <div id="set6" className="card_set"></div>
                    <div id="set7" className="card_set"></div>
                </div>
                <div id="board_left">
                    <div id="draw_container">
                        <div id="draw_cards" className="offhand"></div>
                        <div id="drawed_cards" className="offhand"></div>
                    </div>
                    <div id="finished-cards">
                        <div id="hearts" className="finish_card color_red"><div id="2h" className="finish_icon">♥️</div></div>
                        <div id="spades" className="finish_card color_black"><div id="2s" className="finish_icon">♠️</div></div>
                        <div id="diamonds" className="finish_card color_red"><div id="2d" className="finish_icon">♦️</div></div>
                        <div id="clubs" className="finish_card color_black"><div id="2c" className="finish_icon">♣️</div></div>
                    </div>
                </div>
            </div>
            <Script src="scripts/main.js" strategy="lazyOnload"/>
            <Script src="scripts/yahtzee.js" strategy="lazyOnload"/>
        </>
    )
}