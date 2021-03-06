import * as React from "react";
import { AchievementState } from "../store";
import { connect } from 'react-redux';
import { updatePlayerInfo, acceptInvite, declineInvite, createGroupAction } from '../store/player/actions';
import { PlayerInfo, PlayerState, PlayerAchievementEntry } from '../store/player/types';
import TreeComponent from './TreeComponent'
import { number } from "prop-types";
import { PlayerPartialInfo, Group } from 'achievement-sio';
import TrophyComponent from './TrophComponent';
import { playerAchievementCategories, getCategoryCompletionState, Achievement } from 'achievement-models';
import { PlayerAchievementCategory } from 'achievement-models';
import { achievementMap } from "achievement-models";
import Modal from 'react-bootstrap4-modal'
import { Redirect, withRouter } from "react-router";
import { GroupPartialInfo } from 'achievement-sio';
import {borderMap, getBorderForLevel} from './util'
import AchievementOverviewComponent from "./AchievementOverviewComponent";
import { showAchievementOverview } from "../store/component/actions";
interface AchievementOverviewsComponentState {
}

interface ConfigurableAchievementOverviewsComponentProps {
    topCategory: PlayerAchievementCategory;
    jungleCategory: PlayerAchievementCategory;
    midCategory: PlayerAchievementCategory;
    botCategory: PlayerAchievementCategory;
    supportCategory: PlayerAchievementCategory;
    clownfiestaCategory: PlayerAchievementCategory;

    topAchievements: Achievement<any>;
    jungleAchievements: Achievement<any>;
    midAchievements: Achievement<any>;
    botAchievemets: Achievement<any>;
    supportAchievements: Achievement<any>;
    clownfiestaAchievements: Achievement<any>;
}
  
interface AchievementOverviewsComponentProps {
}

interface AchievementOverviewsComponentActions {
    setOverviewVisible: (visible: boolean) => void;
}

class AchievementOverviewsComponent extends React.Component<ConfigurableAchievementOverviewsComponentProps & AchievementOverviewsComponentProps & AchievementOverviewsComponentActions, AchievementOverviewsComponentState> {

    render() {
        return <div className="achievement_overview_second_border">
        <div onClick={() => this.props.setOverviewVisible(false)} style={{cursor: "pointer", position: "absolute", top: "calc(50% - 60px)", right: "calc(0% - 9px)", zIndex: 2000 }}>
            <span className="fas fa-caret-left font_color" style={{fontSize: "120px"}}></span>
        </div>

        <div className="container achievement_overview_component">
                <div className="row achievement_overview_tite_row"> 
                    <h1 className="achievement_overview_title" style={{width: "100%"}}><span className="highlight_text">CHALLENGES</span></h1>
                    <br></br><span className="small_text" style={{paddingLeft: "25px"}}>Challenges can only be completed in matchmade games in the respective role/game mode.</span>
                </div>
                <div className="row achievement_overview_body">
                    <div className="col" style={{height: "100%"}}>
                        <div className="row row-one-third overview_body_row">
                            <div className="col overview-category-entry">
                                <div className="card">
                                    <div className="card-body">
                                        <AchievementOverviewComponent title={this.props.topCategory.name} icon={this.props.topCategory.icon} achievements={this.props.topAchievements}></AchievementOverviewComponent>
                                    </div>
                                </div>
                            </div>
                            <div className="col overview-category-entry">
                                <div className="card">
                                    <div className="card-body">
                                        <AchievementOverviewComponent title={this.props.jungleCategory.name}  icon={this.props.jungleCategory.icon} achievements={this.props.jungleAchievements}></AchievementOverviewComponent>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row row-one-third overview_body_row">
                        <div className="col overview-category-entry">
                            <div className="card">
                                <div className="card-body">
                                    <AchievementOverviewComponent title={this.props.midCategory.name} achievements={this.props.midAchievements}  icon={this.props.midCategory.icon} ></AchievementOverviewComponent>
                                </div>
                            </div>
                        </div>
                        <div className="col overview-category-entry">
                            <div className="card">
                                <div className="card-body">
                                    <AchievementOverviewComponent title={this.props.botCategory.name} achievements={this.props.botAchievemets}  icon={this.props.botCategory.icon} ></AchievementOverviewComponent>
                                </div>
                            </div>
                        </div>
                        </div>
                        <div className="row row-one-third overview_body_row">
                        <div className="col overview-category-entry">
                            <div className="card">
                                <div className="card-body">
                                    <AchievementOverviewComponent title={this.props.supportCategory.name} achievements={this.props.supportAchievements}  icon={this.props.supportCategory.icon}></AchievementOverviewComponent>
                                </div>
                            </div>
                        </div>
                        <div className="col overview-category-entry">
                            <div className="card">
                                <div className="card-body">
                                    <AchievementOverviewComponent title={this.props.clownfiestaCategory.name} achievements={this.props.clownfiestaAchievements}  icon={this.props.clownfiestaCategory.icon}></AchievementOverviewComponent>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
    }
}
   
  
  function mapStateToProps(state: AchievementState, ownProps: ConfigurableAchievementOverviewsComponentProps): AchievementOverviewsComponentProps {
    return {
    };
  }
  
  function mapDispatchToProps(dispatch): AchievementOverviewsComponentActions {
      return {
          setOverviewVisible: (visible: boolean) => dispatch(showAchievementOverview(visible))
      }
  }
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AchievementOverviewsComponent) as any) as any