import Flight from 'flight';
import NameSpace from 'namespace';
import Events from 'events';
import repositoryDetailsHtml from './repository-details.html';
import repositoryDetailsPatch from './repository-details.patch';
import PatchIt from 'PatchIt';

const repositoryDetailsTemplate = PatchIt.template(
    repositoryDetailsHtml, repositoryDetailsPatch
);

class RepositoryDetailsComponent extends Flight.UIComponent {

    listen() {
        this.detailsView = repositoryDetailsTemplate.render({
            readme: '',
        });
        this.view.append(this.detailsView);

        this.on(NameSpace.GitHub).listen(
            Events.Repository.Chosen, event => this.getRepoDetails(event.repository),
            Events.Repository.DetailsReady, event => this.showDetails(event.details),
        );
    }

    getRepoDetails(repository) {
        this.on(NameSpace.GitHub).trigger(
            new Events.Repository.DetailsRequest(repository)
        );
    }

    showDetails(details) {
        this.detailsView.apply(details);
    }
}

export default RepositoryDetailsComponent;
