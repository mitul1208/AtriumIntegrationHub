var m_localization_eventsTBL = null;
var m_localizationTBL = null;
function localization_events_retrieve(filter) {
    var rArr = new Array();
    var cpt = 0;

    for (var t in m_localizationTBL) {
        if (t.indexOf(filter) == 0) {
            rArr[cpt] = new Object();
            rArr[cpt].id = t;
            rArr[cpt].text = m_localizationTBL[t];
            cpt++;
        }
    }
    return (rArr);
}

function localization_events_init(labels) {
    m_localizationTBL = labels;
    m_localization_eventsTBL = new Array();
    var lblgeneric = new Array();
    var rArr;

    rArr = localization_events_retrieve("EP_generic_type_");
    for (var i = 0; i < rArr.length; i++) {
        var event_id = rArr[i].id.substr(("EP_generic_type_").length, rArr[i].id.length - ("EP_generic_type_").length);
        lblgeneric[i] = new Object();
        lblgeneric[i].id = event_id;
        lblgeneric[i].text = rArr[i].text;
    }

    rArr = localization_events_retrieve("EP_object_type_");
    for (var i = 0; i < rArr.length; i++) {
        var object_type = rArr[i].id.substr("EP_object_type_".length, rArr[i].id.length - "EP_object_type_".length);
        m_localization_eventsTBL[object_type] = new Object();
        m_localization_eventsTBL[object_type].name = rArr[i].text;
        m_localization_eventsTBL[object_type].event = new Array();
        m_localization_eventsTBL[object_type].ext = new Array();

        var rArrID = localization_events_retrieve("EP_object_type" + object_type + "_id_")
        for (var j = 0; j < rArrID.length; j++) {
            var event_id = rArrID[j].id.substr(("EP_object_type" + object_type + "_id_").length, rArrID[j].id.length - ("EP_object_type" + object_type + "_id_").length);
            m_localization_eventsTBL[object_type].event[event_id] = new Object();
            m_localization_eventsTBL[object_type].event[event_id].text = rArrID[j].text;
        }

        var rArrExt = localization_events_retrieve("EP_object_type" + object_type + "_ext_")
        for (var k = 0; k < rArrExt.length; k++) {
            var reason_id = rArrExt[k].id.substr(("EP_object_type" + object_type + "_ext_").length, rArrExt[k].id.length - ("EP_object_type" + object_type + "_ext_").length);
            m_localization_eventsTBL[object_type].ext[reason_id] = new Object();
            m_localization_eventsTBL[object_type].ext[reason_id].text = rArrExt[k].text;
        }

        for (var j = 0; j < lblgeneric.length; j++) {
            var event_id = lblgeneric[j].id;
            m_localization_eventsTBL[object_type].event[event_id] = new Object();
            m_localization_eventsTBL[object_type].event[event_id].text = lblgeneric[j].text;
        }
    }
}

function localization_events_get_objectName(object_type) {
    var result = "??? [Type=" + object_type + "]";
    if (m_localization_eventsTBL != null) {
        if (m_localization_eventsTBL[object_type] != undefined) {
            result = m_localization_eventsTBL[object_type].name;
        }
    }
    return result;
}
function localization_events_get_eventText(object_type, event_id) {
    var result = "??? [Type=" + object_type + ", ID=" + event_id + "]";
    if (m_localization_eventsTBL != null) {
        if (m_localization_eventsTBL[object_type] != undefined) {
            if (m_localization_eventsTBL[object_type].event[event_id] != undefined) {
                result = m_localization_eventsTBL[object_type].event[event_id].text;
            }
        }
    }
    return result;
}
function localization_events_get_eventExtText(object_type, reason_id) {
    var result = "";
    if (m_localization_eventsTBL != null) {
        if (m_localization_eventsTBL[object_type] != undefined) {
            if (m_localization_eventsTBL[object_type].ext[reason_id] != undefined) {
                result = m_localization_eventsTBL[object_type].ext[reason_id].text;
            }
        }
    }
    return result;
}

function localization_events_get_desc(event, head_type, head_id) {
    head_type = head_type || -1;
    head_id = head_id || -1;

    /*Owner*/
    var obj_evt = event['_obj_evt'];
    var obj_sn = event['_obj_sn'];
    var obj_type = event['_obj_type'];
    var obj_id = event['_obj_id'];
    var obj_label = event['_obj_label'];
    var snd_obj_sn = event['_snd_obj_sn'];
    var txt_desc = localization_events_get_eventText(obj_type, obj_evt);
    var txt_owner = "";



    if ((txt_desc.indexOf("{%Osn}") >= 0)) {
        var pos2 = txt_desc.indexOf("}", txt_desc.indexOf("%Osn"));
        var pos1 = txt_desc.substring(0, pos2).lastIndexOf("{");
        txt_desc = txt_desc.replace(txt_desc.substring(pos1, pos2), obj_sn);
    }

    if ((txt_desc.indexOf("{%Ssn}") >= 0)) {
        var pos2 = txt_desc.indexOf("}", txt_desc.indexOf("%Ssn"));
        var pos1 = txt_desc.substring(0, pos2).lastIndexOf("{");
        txt_desc = txt_desc.replace(txt_desc.substring(pos1, pos2), snd_obj_sn);
    }


    if ((txt_desc.indexOf("%O") >= 0) && (obj_type != "-1") && (obj_type != undefined)) {
        txt_owner = localization_events_get_objectName(obj_type);
        txt_owner += (obj_label != "") ? " [ <i>" + obj_label + "</i> ]" : "";
        //txt_owner += (obj_label != "") ? " [ <i>" + obj_label + "</i> ]" : " [ <i>" + obj_sn + "</i> ]";
    }

    if ((obj_type == undefined) || ((obj_type == head_type) && (obj_id == head_id) && (txt_desc.indexOf("%O") >= 0))) {
        if (txt_desc.indexOf("%O") >= 0) {
            var pos2 = txt_desc.indexOf("}", txt_desc.indexOf("%O"));
            var pos1 = txt_desc.substring(0, pos2).lastIndexOf("{");
            txt_desc = txt_desc.replace(txt_desc.substring(pos1, pos2), "");
        }
    }
    txt_desc = txt_desc.replace("%O", txt_owner);

    /*Sender*/
    var snd_obj_sn = event['_snd_obj_sn'];
    var snd_obj_type = event['_snd_obj_type'];
    var snd_obj_id = event['_snd_obj_id'];
    var snd_obj_label = event['_snd_obj_label'];
    var txt_sender = "";
    if ((txt_desc.indexOf("%S") >= 0) && (snd_obj_type != "-1") && (snd_obj_type != undefined)) {
        txt_sender = localization_events_get_objectName(snd_obj_type);
        txt_sender += (snd_obj_label != "") ? " [ <i>" + snd_obj_label + "</i> ]" : "";
        //txt_sender += (snd_obj_label != "") ? " [ <i>" + snd_obj_label + "</i> ]" : " [ <i>" + snd_obj_sn + "</i> ]";
    }
    if ((snd_obj_type == undefined) || ((snd_obj_type == head_type) && (snd_obj_id == head_id) && (txt_desc.indexOf("%S") >= 0))) {
        if (txt_desc.indexOf("%S") >= 0) {
            var pos2 = txt_desc.indexOf("}", txt_desc.indexOf("%S"));
            var pos1 = txt_desc.substring(0, pos2).lastIndexOf("{");
            txt_desc = txt_desc.replace(txt_desc.substring(pos1, pos2), "");
        }
    }
    txt_desc = txt_desc.replace("%S", txt_sender);

    /*Card*/
    var txt_card = event['_ext_card'];
    if ((txt_desc.indexOf("%CARD") >= 0) && (txt_card == undefined)) {
        var pos2 = txt_desc.indexOf("}", txt_desc.indexOf("%CARD"));
        var pos1 = txt_desc.substring(0, pos2).lastIndexOf("{");
        txt_desc = txt_desc.replace(txt_desc.substring(pos1, pos2), "");
    }
    txt_desc = txt_desc.replace("%CARD", txt_card);

    /*Extra 1-7*/
    for (var i = 1; i <= 7; i++) {
        var ext_obj_sn = event['_ext_obj_sn_' + i];
        var ext_obj_type = event['_ext_obj_type_' + i];
        var ext_obj_id = event['_ext_obj_id_' + i];
        var ext_obj_label = event['_ext_obj_lbl_' + i];
        var txt_ext = "";
        if ((txt_desc.indexOf("%E" + i) >= 0) && (ext_obj_type != "-1") && (ext_obj_type != undefined)) {
            txt_ext = localization_events_get_objectName(ext_obj_type);
            txt_ext += (ext_obj_label != "") ? " [ <i>" + ext_obj_label + "</i> ]" : "";
            //txt_ext += (ext_obj_label != "") ? " [ <i>" + ext_obj_label + "</i> ]" :  "[ <i>" + ext_obj_sn + "</i> ]";
        }
        if ((ext_obj_type == undefined) || ((ext_obj_type == head_type) && (ext_obj_id == head_id) && (txt_desc.indexOf("%E" + i) >= 0))) {
            if (txt_desc.indexOf("%E" + i) >= 0) {
                var pos2 = txt_desc.indexOf("}", txt_desc.indexOf("%E" + i));
                var pos1 = txt_desc.substring(0, pos2).lastIndexOf("{");
                txt_desc = txt_desc.replace(txt_desc.substring(pos1, pos2), "");
            }
        }

        txt_desc = txt_desc.replace("%E" + i, txt_ext);
    }

    var obj_reason_granted = event['_obj_reason_granted'];
    var obj_reason_denied = event['_obj_reason_denied'];

    /*add extra data*/
    if (obj_reason_denied != undefined) {
        var ext_obj_type_2 = event['_ext_obj_type_2'];
        txt_desc += " " + localization_events_get_eventExtText(ext_obj_type_2, obj_reason_denied);
    }
    else if (obj_reason_granted != undefined) {
        var ext_obj_type_5 = event['_ext_obj_type_5'];
        txt_desc += " " + localization_events_get_eventExtText(ext_obj_type_5, obj_reason_granted);
    }

    txt_desc = txt_desc.replace("%E" + i, txt_ext);
    txt_desc = txt_desc.replace(/[{}]+/g, "");  /*Removed Brackets*/

    return txt_desc;
}