# Performance

## useMemo

- FCはstateやpropsが変更したタイミング更新される
    - この更新を無駄に走らせないために`useMemo`を検討する
    - ちなみにCCのconstructorはstateやpropsが変更になっても更新されない