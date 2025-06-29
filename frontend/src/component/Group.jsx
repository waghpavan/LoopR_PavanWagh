import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';

export function Group() {
  const [group_list, setGroupList] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const visibleGroupCount = 5;

  const fetchgroup = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/group/group_list', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      setGroupList(response.data.group_list);
    } catch (error) {
      console.error('Error fetching grouplist:', error);
    }
  };

  useEffect(() => {
    fetchgroup();
  }, []);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-2/6 max-w-3xl bg-blue-50 mx-3 p-4 border border-blue-300 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <div className="font-bold text-2xl text-blue-700">Groups</div>
        <button
          onClick={() => navigate('/Create_group')}
          className="bg-red-500 text-white px-4 py-2 rounded-md transition-all duration-200 hover:bg-red-600 shadow"
        >
          + Add Group
        </button>
      </div>

      <div className="space-y-4">
        {group_list
          .slice(0, isExpanded ? group_list.length : visibleGroupCount)
          .map((grp) => (
            <Single_Group key={grp._id} group={grp} />
          ))}
      </div>

      {group_list.length > visibleGroupCount && (
        <div className="flex justify-center mt-4">
          <button
            onClick={toggleExpand}
            className="bg-blue-600 text-white px-4 py-2 rounded-md transition-all duration-200 hover:bg-blue-700 shadow"
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
      )}
    </div>
  );
}

function Single_Group({ group }) {
  const navigate = useNavigate();

  return (
    <div className="flex w-full justify-between items-center bg-white border border-blue-200 rounded-md p-4 transition-all duration-200 hover:shadow-md hover:bg-blue-50">
      <div className="flex items-center">
        <div className="rounded-full h-12 w-12 bg-red-100 flex justify-center items-center mr-4 shadow-inner border border-red-300">
          <span className="text-xl font-bold text-red-600">{group.name[0]}</span>
        </div>
        <div className="text-lg font-semibold text-blue-700">{group.name}</div>
      </div>
      <Button
        onClick={() => navigate('/Split?id=' + group._id)}
        label="Manage"
      />
    </div>
  );
}
