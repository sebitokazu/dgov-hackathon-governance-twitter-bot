const axios = require('axios').default;
axios.defaults.baseURL = process.env.BOARDROOM_API_URL

const HTTP_STATUS_OK = 200;

class BoardroomService{

    async getProtocols(){
        console.log('Fetching /protocols');
        const res = await axios.get('/protocols');
        if(res.status === HTTP_STATUS_OK)
            return res.data;
        else
            return null;
    }

    async getProtocolsByName(name){
        if(name === null || name === '')
            return null;

        console.log(`Fetching /protocols/${name}`);
        const res = await axios.get(`/protocols/${name}`);
        if(res.status === HTTP_STATUS_OK)
            return res.data;
        else
            return null;
    }

    async getProposals(){
        console.log(`Fetching /proposals`);
        const res = await axios.get(`/proposals`);
        if(res.status === HTTP_STATUS_OK)
            return res.data;
        else
            return null;
    }

    async getProposalsByProtocol(name){
        if(name === null || name === '')
            return null;

        console.log(`Fetching /protocols/${name}/proposals`);
        const res = await axios.get(`/protocols/${name}/proposals`);
        if(res.status === HTTP_STATUS_OK)
            return res.data;
        else
            return null;
    }

    async getProposalsById(refId){
        if(refId === null)
            return null;

        console.log(`Fetching /proposals/${refId}`);   
        const res = await axios.get(`/proposals/${refId}`);
        if(res.status === HTTP_STATUS_OK)
            return res.data;
        else
            return null;
    }

    async getProposalsVotesByIf(refId){
        if(refId === null)
            return null;

        console.log(`Fetching /proposals/${refId}/votes`);      
        const res = await axios.get(`/proposals/${refId}/votes`);
        if(res.status === HTTP_STATUS_OK)
            return res.data;
        else
            return null;        
    }

    async getVotesByVoter(address){
        if(address === null)
            return null;

        console.log(`Fetching /voters/${address}/votes`);          
        const res = await axios.get(`/voters/${address}/votes`);
        if(res.status === HTTP_STATUS_OK)
            return res.data;
        else
            return null;        
    }

    async getVotersByProtocol(address){
        if(address === null)
            return null;

        console.log(`Fetching /protocols/${address}/voters`);       
        const res = await axios.get(`/protocols/${address}/voters`);
        if(res.status === HTTP_STATUS_OK)
            return res.data;
        else
            return null;        
    }

    async getVoters(){
        console.log(`Fetching /voters`);    
        const res = await axios.get(`/voters`);
        if(res.status === HTTP_STATUS_OK)
            return res.data;
        else
            return null;        
    }

    async getVoter(address){
        if(address === null)
            return null;

        console.log(`Fetching /voters/${address}`);    
        const res = await axios.get(`/voters/${address}`);
        if(res.status === HTTP_STATUS_OK)
            return res.data;
        else
            return null;        
    }


}